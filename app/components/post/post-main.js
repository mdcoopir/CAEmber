import Ember from 'ember';

export default Ember.Component.extend({
  casession: Ember.inject.service(),
  isEditting: false,
  actions: {
    toggleEdit() {
      this.toggleProperty('isEditting');
    },
    addComment(comment, post) {
      this.sendAction('addComment', comment, post);
    },
    deletePost(post) {
      post.destroyRecord();
    }
  }
});
