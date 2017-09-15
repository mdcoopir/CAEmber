import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleIsEditting() {
      this.sendAction('toggleIsEditting');
    },
    saveComment(comment, post) {
      this.send('toggleIsEditting');
      if (this.get('addingComment')) {
        this.sendAction('addComment', comment, post);
      } else {
        comment.save();
      }
    },
    deleteComment(comment) {
      comment.destroyRecord();
    }
  }
});
