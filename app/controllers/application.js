import Ember from 'ember';

export default Ember.Controller.extend({
  casession: Ember.inject.service('casession'),
  actions: {
    logout(){
      this.get('casession').logout();
      this.transitionToRoute('home');
    }
  }
});
