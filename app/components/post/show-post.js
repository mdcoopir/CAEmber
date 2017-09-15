import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleEdit() {
      this.sendAction('toggleEdit');
    },
    addComment(comment, parent) {
      this.sendAction('addComment', comment, parent);
    }
  }
});
