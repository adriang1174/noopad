var app = angular.module('noopad', ['dropbox', 'noopad.config', 'ngMaterialize']);

app.config(function(DropboxProvider, noopadConfig) {
        'use strict';
        DropboxProvider.config(noopadConfig.dropboxApiKey, noopadConfig.baseUrl + 'callback.html');
    })
    .controller('AppController', function($scope, Dropbox, $window) {
        'use strict';

        function login() {
            $window.console.log('doing login');
            Dropbox.authenticate().then(function success(credentials) {
                Dropbox.accountInfo().then(function(accountInfo) {
                    $scope.userDisplayName = accountInfo.display_name;

                    Dropbox.readdir('/').then(function success(entries) {
                        $scope.files = entries;
                    });
                    
                });
            }, function error(reason) {
                $window.console.log('Authentication failed with: ' + reason);
            });
        }

        function showFile(filename) {
            Dropbox.readFile(filename).then(function success(fileData) {
                $scope.content = {
                    title: filename,
                    body: fileData
                };
            });
        }

        
        $scope.authenticate = login;
        $scope.showFile = showFile;
    });
