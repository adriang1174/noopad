/*jshint camelcase: false */
(function () {
    'use strict';
    
    var app = angular.module('noopad', ['dropbox', 'noopad.config', 'ngMaterialize', 'ngRoute', 'cfp.hotkeys', 'hc.marked']);

    app.constant('noopadKey', 'noopad.oauth');

    app.config(function (DropboxProvider, noopadConfig) {
        DropboxProvider.config(noopadConfig.dropboxApiKey, noopadConfig.baseUrl + 'callback.html');
    });

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'login/login.html',
                controller: 'loginController',
                controllerAs: 'loginCtrl'
            })
            .when('/editor', {
                templateUrl: 'editor/editor.html',
                controller: 'editorController',
                controllerAs: 'editorCtrl',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/login'
            });
    });

    app.config(['markedProvider', function (markedProvider) {
        markedProvider.setOptions({ 
            gfm: true 
        });
    }]);

    app.filter('editorUrl', function ($window) {
        return function (url) {
            var noSlashUrl = url.substring(1);
            return '#/editor?f=' + $window.encodeURIComponent(noSlashUrl);
        };
    });

    app.directive('flipper', function () {
        return {
            restrict: 'E',
            template: '<div class="flipper" ng-transclude ng-class="{ flipped: flipped }"></div>',
            transclude: true,
            scope: {
                flipped: '='
            }
        };
    });

    app.directive('front', function() {
        return {
            restrict: 'E',
            template: '<div class="front tile" ng-transclude></div>',
            transclude: true
        };
    });

    app.directive('back', function() {
        return {
            restrict: 'E',
            template: '<div class="back tile" ng-transclude></div>',
            transclude: true
        };
    });

 })();
