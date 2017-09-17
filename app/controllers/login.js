import Ember from 'ember';
import UserValidations from '../validations/user';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

export default Ember.Controller.extend({
  UserValidations,
  store: Ember.inject.service(),
  casession: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  newUser: null,
  newUserChangeset: null,

  emailValidation: [{
    message: 'Please provide email in a valid format',
    validate: (inputValue) => {
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(inputValue);
    }
  }],
  passwordValidation: [{
    message: 'Password must be 8 characters long, have 1 or more uppercase and lowercase letters.',
    validate: (inputValue) => {
      let emailPattern =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return emailPattern.test(inputValue);
    }
  }],

  init(){
    let newUserTemp =  this.get('store').createRecord('user', {email: "", displayName: "", password: ""});
    this.set('newUser', newUserTemp);
  },
  didTransition(){
    this.set('newUserChangeset', new Changeset(this.get('newUser'), lookupValidator(UserValidations), UserValidations));
  },
  actions: {
    login(email, password){
      this.get('casession').login(email, password).then(() => {
        let message = 'You are logged in as: '+this.get('casession.currentUser.displayName');
        this.get('flashMessages').success(message);
        this.transitionToRoute('members.myHome');
      }).catch(() => {
        this.get('flashMessages').danger('Email and password are not valid.');
      });
    },
    register(changeset){
      this.get('flashMessages').clearMessages();
      this.get('casession').register(changeset).then(() => {
        let message = 'You are registered in as: '+this.get('casession.currentUser.displayName');
        this.get('flashMessages').success(message);
        this.transitionToRoute('members.myHome');
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
