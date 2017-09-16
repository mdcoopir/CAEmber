import Ember from 'ember';

export default Ember.Controller.extend({
  casession: Ember.inject.service(),
  store: Ember.inject.service(),
  newTitle: null,
  newBody: null,
  me: Ember.computed.alias('casession.currentUser'),
  leftSideBarOpen2: true,

  actions: {
    toggleExpand() {
      Ember.$('#detailsNewPost').removeAttr('open');
    },
    addPost(postEntry) {
      this.store.createRecord('post', {
        title: postEntry._changes.title,
        body: postEntry._changes.body,
        user: this.get('casession.currentUser')
      }).save().then(()=>{
        this.get('casession.currentUser').save();
      });
    },
    addComment(comment, post) {
      if(post.title ){
        this.store.createRecord('comment', {
          message: comment._changes.message,
          post: post
        }).save().then(()=>{
          post.save();
        });
      } else {
        this.store.createRecord('comment', {
          message: comment._changes.message,
          parent: post
        }).save().then(()=>{
          post.save();
        });
      }
    }
  }
});
