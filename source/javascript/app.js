/*jshint camelcase: false */
(function() {
'use strict';

var app = angular.module('noopad', ['dropbox', 'noopad.config', 'ngMaterialize', 'ngRoute']);

app.constant('noopadKey','noopad.oauth');

app.config(function(DropboxProvider, noopadConfig) {
        DropboxProvider.config(noopadConfig.dropboxApiKey, noopadConfig.baseUrl + 'callback.html');
    });

app.config(function($routeProvider) {
$routeProvider
  .when('/login', {
    templateUrl: 'login.html',
    controller: 'loginController',
    controllerAs: 'loginCtrl'
  })
  .when('/editor', { 
    templateUrl: 'editor.html',
    controller: 'editorController',
    controllerAs: 'editorCtrl'
  })
  .otherwise({redirectTo: '/login'});
});

app.controller('loginController', function($location, $toast, $window, Dropbox, noopadKey) {
    var vm = this;

    vm.login = function() {
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

app.controller('editorController', function(Dropbox, $window, $toast, $location, noopadKey) {
        var vm = this;

        function logoff() {
            localStorage.removeItem(noopadKey);
            Dropbox.setCredentials('');
            $location.path('/login');
        }

        function getAccount() {
            Dropbox.accountInfo().then(function(accountInfo) {
                $toast.show('Logged in as ' + accountInfo.display_name);
                Dropbox.readdir('/').then(function success(entries) {
                    vm.files = entries;
                });           
            }, function error() {
                $window.console.log('Error. Could not get content.');
                $location.path('/login');
            });
        }

        function showFile(filename) {
            Dropbox.readFile(filename).then(function success(filedata) {
                vm.content = {
                    title: filename,
                    body: filedata
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

        // Get user info when instantiating the controller
        if (localStorage[noopadKey]) {
            var oauth = angular.fromJson(localStorage[noopadKey]);
            Dropbox.setCredentials(oauth);
            getAccount();
        } else {
            $location.path('/login');
        }
        
        vm.logoff = logoff;
        vm.showFile = showFile;
        vm.saveFile = saveFile;
    });
})();
