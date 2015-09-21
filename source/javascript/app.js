var app = angular.module('noopad', ['ui.bootstrap', 'dropbox', 'noopad.config']);

app.config(function(DropboxProvider, EnvironmentConfig) {
        'use strict';
        DropboxProvider.config(EnvironmentConfig.dropboxApiKey, EnvironmentConfig.baseUrl + 'callback.html');
    })
    .controller('AppController', function($scope, Dropbox, $window) {
        'use strict';

        function login() {
            $window.console.log('doing login');
            Dropbox.authenticate().then(function(credentials) {
                $window.console.log('Success: ' + credentials.access_token);
            }, function(reason) {
                $window.console.log('Failed: ' + reason);
            }, function(update) {
                $window.console.log('Got notification: ' + update);
            });
        }

        function info() {
            $window.console.log('doing info');
            Dropbox.accountInfo().then(function(accountInfo) {
                $window.console.log(accountInfo.display_name);
            });
        }

        $scope.content = {
            title: 'Dropbox Account',
            body: 'body'
        };

        $scope.isLoggedIn = Dropbox.isAuthenticated();
        $scope.authenticate = login;
        $scope.getInfo = info;
    });
