import Ember from 'ember';
import UserValidations from '../validations/user';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

export default Ember.Controller.extend({
  UserValidations,
  store: Ember.inject.service(),
  casession: Ember.inject.service(),
  newUser: null,
  newUserChangeset: null,
  flashMessages: Ember.inject.service(),
  disableRegisterButton: Ember.computed('newUserChangeset.isInvalid', function() {
    let changeset = this.get('newUserChangeset');
    if(changeset.get('isInvalid')) {
      return true;
    } else {
      return false;
    }
  }),
  init(){
    this.set('newUser', this.get('store').createRecord('user', {email: "", displayName: "", password: ""}));
    this.set('newUserChangeset', new Changeset(this.get('newUser'), lookupValidator(UserValidations), UserValidations));
  },
  actions: {
    register(changeset){
      this.get('flashMessages').clearMessages();
      this.get('casession').register(changeset).then(() => {
        let message = 'You are registered in as: '+this.get('casession.currentUser.displayName');
        this.get('flashMessages').success(message);
        this.transitionToRoute('restaurants');
      }).catch((errors) => {
        if(Ember.isArray(errors)) {
          errors.forEach((error)=>{
            let message = `Error on ${error.attribute}: ${error.message}`;
            this.get('flashMessages').danger(message, {sticky: true});
          });
        } else {
          this.get('flashMessages').danger(errors.message, {sticky: true});
        }
      });
    }
  }
});
