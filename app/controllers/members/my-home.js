import Ember from 'ember';

export default Ember.Controller.extend({
  casession: Ember.inject.service(),
  memberMain: Ember.inject.controller('members.myHome.main'),

  init() {
    if(!this.get('casession.currentUser')) {
      this.transitionToRoute("/home")
    }
  },

  actions: {
    toggleLeftMenu(){
      this.get('memberMain').set('leftSideBarOpen2', !this.get('memberMain.leftSideBarOpen2'))
    }
  }
});
