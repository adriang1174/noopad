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
                templateUrl: 'partials/login.html',
                controller: 'loginController',
                controllerAs: 'loginCtrl'
            })
            .when('/editor', {
                templateUrl: 'partials/editor.html',
                controller: 'editorController',
                controllerAs: 'editorCtrl',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/login'
            });
    });

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

    app.controller('loginController', function ($location, $toast, $window, Dropbox, noopadKey) {
        var vm = this;

        vm.login = function () {
            Dropbox.authenticate().then(function success(oauth) {
                if (oauth.uid) {
                    localStorage[noopadKey] = angular.toJson(oauth);
                    $location.path('/editor');
                } else {
                    $window.console.log('Missing oauth token!');
                }
            }, function error(reason) {
                $toast.show('Authentication failed with: ' + reason);
            });
        };

        // If we already have an auth go directly to editor
        if (localStorage[noopadKey]) {
            $location.path('/editor');
        }
    });

    app.controller('editorController', function (Dropbox, $window, $toast, $location, noopadKey, hotkeys, marked) {
        var vm = this;

        hotkeys.add({
          combo: ['command+s', 'ctrl+s'],
          description: 'Save file',
          callback: function(event) {
            vm.saveFile();
            event.preventDefault();
          }
        });

        function logoff() {
            localStorage.removeItem(noopadKey);
            Dropbox.setCredentials('');
            $location.path('/login');
        }

        function getAccount() {
            Dropbox.accountInfo().then(function (accountInfo) {
                $toast.show('Logged in as ' + accountInfo.display_name);
                Dropbox.readdir('/').then(function success(entries) {
                    vm.files = entries;
                });
            });
        }

        function readFile(filename) {
            Dropbox.readFile(filename).then(function success(filedata) {
                vm.content = {
                    title: filename,
                    body: filedata,
                    markdownBody: marked(filedata)
                };
            });
        }

        function saveFile() {
            var filename = vm.content.title,
                body = vm.content.body;
            Dropbox.writeFile(filename, body).then(function success() {
                $toast.show('Saved ' + filename);
            });
        }

        function setupEditor() {
            if (localStorage[noopadKey]) {
                var oauth = angular.fromJson(localStorage[noopadKey]);
                Dropbox.setCredentials(oauth);
                getAccount();
                if ($location.search().f) {
                    var dropboxName = '/' + $window.decodeURIComponent($location.search().f);
                    readFile(dropboxName);
                }
            } else {
                $location.path('/login');
            }
        }

        function flip() {
            vm.flipped = !vm.flipped;
        }


        setupEditor();

        vm.flipped = false;
        vm.flip = flip;
        vm.readFile = readFile;
        vm.logoff = logoff;
        vm.saveFile = saveFile;
    });
})();
