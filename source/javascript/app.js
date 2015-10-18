/*jshint camelcase: false */

var app = angular.module('noopad', ['dropbox', 'noopad.config', 'ngMaterialize']);

app.config(function(DropboxProvider, noopadConfig) {
        'use strict';
        DropboxProvider.config(noopadConfig.dropboxApiKey, noopadConfig.baseUrl + 'callback.html');
    })
    .controller('AppController', function($scope, Dropbox, $window, $toast) {
        'use strict';

        function login() {
            $window.console.log('doing login');
            Dropbox.authenticate().then(function success() {
                Dropbox.accountInfo().then(function(accountInfo) {
                    $scope.userDisplayName = accountInfo.name_details.familiar_name;
                    $toast.show('Logged in as ' + accountInfo.display_name);

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
