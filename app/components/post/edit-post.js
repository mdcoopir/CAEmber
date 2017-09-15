import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleEdit() {
      this.sendAction('toggleEdit');
    },
    savePost(post) {
      this.send('toggleEdit');
      if(this.get('addingPost')) {
        this.sendAction('addPost', post);
      } else {
        post.save();
      }
    },
    deletePost(post) {
      post.destroyRecord();
    }
  }
});
