import Ember from 'ember';

export default Ember.Controller.extend({
  casession: Ember.inject.service('casession'),
  actions: {
    logout(){
      this.get('casession').logout();
      this.transitionToRoute('home');
    },
    nav(location){
      this.transitionToRoute(location);
//      this.send('closeMenu', menu);
    },
    closeMenu(menu) {
      menu.close();
    }
  }
});
