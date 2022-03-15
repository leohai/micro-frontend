// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('angular', {
    url: '/angular',
    abstract: true,
    templateUrl: '//localhost:5500/subApp/angularjs/www/templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('angular.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: '//localhost:5500/subApp/angularjs/www/templates/search.html'
      }
    }
  })

  .state('angular.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: '//localhost:5500/subApp/angularjs/www/templates/browse.html'
        }
      }
    })
    .state('angular.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: '//localhost:5500/subApp/angularjs/www/templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('angular.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: '//localhost:5500/subApp/angularjs/www/templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/angular/playlists');
});
