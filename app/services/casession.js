import Ember from 'ember';

export default Ember.Service.extend({
  cookies: Ember.inject.service(),
  store: Ember.inject.service(),
  firebase: Ember.inject.service('firebaseApp'),

  currentUser: null,
  // account: Ember.computed('currentUser.id', function() {
  //   const user_id =  this.get('currentUser.id');
  //     return DS.PromiseObject.create({
  //       promise: this.get('currentUser')
  //     });
  // }),

  login(email, password) {
    let auth = this.get('firebase').auth(), my_this=this;
    if(!email.includes('@')) {
      return this.get('store').query('user', {
        filter: {
          displayName: email
        }
      }).then((user) => {
        let userEmail = user.get('firstObject.email');
        return emailLogin(userEmail, password);
      });
    } else {
      return emailLogin(email, password);
    }
    function emailLogin(email, password) {
      return auth.signInWithEmailAndPassword(email, password).then((firebaseUser)=>{
        return my_this.get('store').findRecord('user', firebaseUser.uid).then((user) => {
          my_this.set('currentUser', user);
          my_this.get('cookies').clear('currentUserId');
          my_this.get('cookies').write('currentUserId', user.get('id'));
          my_this.get('cookies').write('ca.remember', user.get('remember'));
        });
      });
    }
  },

  register(changeset) {
    let auth = this.get('firebase').auth(), change = changeset.get('change');

    return changeset.validate().then(()=>{
      if(changeset.get('isValid')) {
        return this.get('store').query('user', {
          filter: {
            displayName: changeset.displayName
          }
        }).then(() => {
          return Ember.RSVP.reject({message: 'Display Name "'+change.displayName+'" already exist.  Please select a different Display Name'});
        }).catch((error) =>{
          if(error.message.startsWith("Display Name")){
            return Ember.RSVP.reject(error);
          } else {
            return auth.createUserWithEmailAndPassword(change.email, change.password).then((firebaseUser)=>{
              changeset.set('id', firebaseUser.uid);
              let tempPassword = changeset.get('password');
              changeset.set('password', 'OnAuth12');
              return changeset.save().then(()=>{
                change.password = tempPassword;
                return changeset;
              });
            });
          }
        });
      } else {
        return Ember.RSVP.reject(changeset.get('errors'));
      }
    }).then(() => {
      return this.login(change.email, change.password);
    });
  },
  logout(){
    let auth = this.get('firebase').auth();
    this.set('currentUser', null);
    this.get('cookies').clear('currentUserId');
    auth.signOut();
  },
  init() {
    this._super(...arguments);
    let currentUserId =   this.get('cookies').read('currentUserId');
    if(currentUserId) {
      this.get('store').findRecord('user', currentUserId).then((user)=>{
        this.set('currentUser', user);
      });
    }
  }
});
