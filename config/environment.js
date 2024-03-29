/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'ca4',
    environment,
    rootURL: '/',
    locationType: 'auto',

    firebase: {
      apiKey: "AIzaSyAk95o3xKhVDrEk2L3MhXESvgGHXPQv0yE",
      authDomain: "christianabide-be5b1.firebaseapp.com",
      databaseURL: "https://christianabide-be5b1.firebaseio.com",
      projectId: "christianabide-be5b1",
      storageBucket: "christianabide-be5b1.appspot.com",
      messagingSenderId: "874744210416"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.firebase = {
      apiKey: "AIzaSyAk95o3xKhVDrEk2L3MhXESvgGHXPQv0yE",
      authDomain: "christianabide-be5b1.firebaseapp.com",
      databaseURL: "https://christianabide-be5b1.firebaseio.com",
      projectId: "christianabide-be5b1",
      storageBucket: "christianabide-be5b1.appspot.com",
      messagingSenderId: "874744210416"
    };
  }

  return ENV;
};
