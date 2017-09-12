import Ember from 'ember';

export default Ember.Service.extend({
  cookies: Ember.inject.service(),
  store: Ember.inject.service(),
  firebase: Ember.inject.service('firebaseApp'),

  currentUser: null,
  login(email, password) {
    let auth = this.get('firebase').auth();
    return auth.signInWithEmailAndPassword(email, password).then((firebaseUser)=>{
      return this.get('store').findRecord('user', firebaseUser.uid).then((user) => {
        this.set('currentUser', user);
        this.get('cookies').write('currentUserId', user.get('id'));
      });
    });

  },
  register(changeset) {
    let auth = this.get('firebase').auth(), change = changeset.get('change');

    return changeset.validate().then(()=>{
      if(changeset.get('isValid')) {
        return auth.createUserWithEmailAndPassword(change.email, change.password).then((firebaseUser)=>{
          changeset.set('id', firebaseUser.uid);
          let tempPassword = changeset.get('password');
          changeset.set('password', 'OnAuth12');
          return changeset.save().then(()=>{
            change.password = tempPassword;
            return changeset;
          });
        });
      } else {
        return Ember.RSVP.reject(changeset.get('errors'));
      }
    })
    .then(() => {
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
