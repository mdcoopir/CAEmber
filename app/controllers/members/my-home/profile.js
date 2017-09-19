import Ember from 'ember';

export default Ember.Controller.extend({
  casession: Ember.inject.service(),
  store: Ember.inject.service(),
  me: Ember.computed.alias('casession.currentUser'),
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
  actions: {
    saveAccount(changeset) {
      this.get('flashMessages').clearMessages();

      changeset.validate().then(()=>{
        return changeset.save().then(()=>{
          let message = 'Profile saved for member: '+this.get('casession.currentUser.displayName');
          this.get('flashMessages').success(message);
          return changeset;
        }).catch((errors) => {
          return Ember.RSVP.reject(errors);
        });
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
