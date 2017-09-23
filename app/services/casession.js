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
        let filteredRecords = user.filter((item)=>{
          return item.get('displayName')===email;
        }, user);
        let userEmail = filteredRecords.get('firstObject.email');
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
    let auth = this.get('firebase').auth(), change = changeset.get('change'), my_this = this;
    // let errorMsg = 'Display Name "'+change.displayName+'" already exist.  Please select a different Display Name';
    return this.get('userNotExist')(my_this, changeset).then(()=>{
    //return this.get('userNotExist')(changeset).then(()=>{
      return auth.createUserWithEmailAndPassword(change.email, change.password).then((firebaseUser)=>{
        changeset.set('id', firebaseUser.uid);
        let tempPassword = changeset.get('password');
        changeset.set('password', 'OnAuth12');
        return changeset.save().then(()=>{
          change.password = tempPassword;
          return changeset;
        });
      });
    }).catch((error)=>{
      return Ember.RSVP.reject({message: error});
    });
  },

  // updateAccount(changeset) {
  //   let auth = this.get('firebase').auth(), change = changeset.get('change'), my_this = this;
  //
  //
  //   return changeset.validate().then(()=>{
  //     if(changeset.get('isValid')) {
  //       return this.get('store').queryRecord('user', {
  //         filter: {
  //           displayName: changeset.displayName
  //         }
  //       }).then((record) => {
  //         if(record.id!=this.get('currentUser').id) {
  //           return Ember.RSVP.reject({message: 'Display Name "'+change.displayName+'" already exist.  Please select a different Display Name'});
  //         } else {
  //           return this.get('currentUser').updateProfile({
  //             displayName: changeset.displayName
  //           }).then(()=>{
  //             return this.get('store').queryRecord('user', {
  //               filter: {
  //                 email: changeset.email
  //               }
  //             }).then((record) => {
  //               if(record.id!=this.get('currentUser').id) {
  //                 return Ember.RSVP.reject({message: 'Email "'+change.email+'" already exist.  Please select a different email'});
  //               } else {
  //                   return this.get('currentUser').updateProfile({
  //                     email: changeset.email
  //                   }).then(()=>{
  //
  //                   })
  //
  //           });
  //
  //         }
  //       }).catch((error) =>{
  //         if(error.message.startsWith("Display Name")){
  //           return Ember.RSVP.reject(error);
  //         } else {
  //           return auth.createUserWithEmailAndPassword(change.email, change.password).then((firebaseUser)=>{
  //             changeset.set('id', firebaseUser.uid);
  //             let tempPassword = changeset.get('password');
  //             changeset.set('password', 'OnAuth12');
  //             return changeset.save().then(()=>{
  //               change.password = tempPassword;
  //               return changeset;
  //             });
  //           });
  //         }
  //       });
  //     } else {
  //       return Ember.RSVP.reject(changeset.get('errors'));
  //     }
  //   }).then(() => {
  //     return this.login(change.email, change.password);
  //   });
  // },
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
  },
  emailNotExist(fieldValue){
    return new Ember.RSVP.Promise((resolve, reject) => {
      let my_this=this;
      my_this.get('userNotExistField')(my_this, fieldValue, 'email', 'Email').then(()=>{
        resolve();
      }).catch((errorMsg)=>{
        reject(errorMsg);
      });
    });
  },
  userNotExistField(my_this, fieldValue, fieldName, fieldDisplayName) {

    return new Ember.RSVP.Promise((resolve, reject) => {
      my_this.get('store').query('user', {
        filter: {
          fieldName: fieldValue
        }
      }).then((records) => {
        let filteredRecords = records.filter((item)=>{
          return item.get(fieldName)===fieldValue;
        }, records);
        if(filteredRecords.length>0) {
          let userUsing = (my_this.get('currentUser') && filteredRecords[0].get('id') === my_this.get('currentUser').id) ? 'you': 'another user';
          let errorMsg = fieldDisplayName +' "'+fieldValue+'" is already in use by '+userUsing+'.  Please select a different Display Name.';
          reject(errorMsg);
        } else {
          resolve();
        }
      }).catch(() =>{
        resolve();
      });
    });
  },
  userNotExist(my_this, changeset) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let promises = [];
      promises.push(my_this.get('userNotExistField')(my_this, changeset.get('displayName'), 'displayName', 'Display Name'));
      promises.push(my_this.get('userNotExistField')(my_this, changeset.get('email'), 'email', 'Email'));
      Ember.RSVP.all(promises).then((record)=>{
        resolve(record);
      }).catch((errorMsg)=>{
        reject(errorMsg);
      });
    });
  }
});
