import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('poweredBy');
  this.route('contact');
  this.route('login');
  this.route('home');
  this.route('register');

  this.route('members', function() {
    this.route('myHome');

    this.route('myHome', function() {
      this.route('post', {path: 'post/:id'});
      this.route('posts');
      this.route('main', {path: '/'});

      this.route('guest', {path: 'guest/:id'}, function() {
        this.route('posts');
      });
      this.route('profile', function() {
        this.route('passwordChange');
      });
    });
  });

});

export default Router;
