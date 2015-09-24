var app = angular.module('noopad', ['ui.bootstrap', 'dropbox', 'noopad.config']);

app.config(function(DropboxProvider, noopadConfig) {
        'use strict';
        DropboxProvider.config(noopadConfig.dropboxApiKey, noopadConfig.baseUrl + 'callback.html');
    })
    .controller('AppController', function($scope, Dropbox, $window) {
        'use strict';

        function login() {
            $window.console.log('doing login');
            Dropbox.authenticate().then(function success(credentials) {
                $window.console.log('Authenticated success');
                Dropbox.accountInfo().then(function(accountInfo) {
                    $scope.displayName = accountInfo.display_name;
                });
            }, function error(reason) {
                $window.console.log('Failed: ' + reason);
            });
        }

        $scope.content = {
            title: 'Dropbox Account',
            body: 'body'
        };
        
        $scope.authenticate = login;
    });
