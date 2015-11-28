/*jshint camelcase: false */

var app = angular.module('noopad', ['dropbox', 'noopad.config', 'ngMaterialize']);

app.config(function(DropboxProvider, noopadConfig) {
        'use strict';
        DropboxProvider.config(noopadConfig.dropboxApiKey, noopadConfig.baseUrl + 'callback.html');
    })
    .controller('AppController', function($scope, Dropbox, $window, $toast) {
        'use strict';

        function login() {
            Dropbox.authenticate().then(function success(oauth) {
                if (oauth.uid) {
                    localStorage['ngDropbox.oauth'] = angular.toJson(oauth);
                    $scope.isLoggedIn = true;
                    getAccount();
                } else {
                    $window.console.log('Missing oauth token!');
                    $scope.isLoggedIn = false;
                }

            }, function error(reason) {
                $toast.show('Authentication failed with: ' + reason);
            });
        }

        function logoff() {
            localStorage.removeItem('ngDropbox.oauth');
            Dropbox.setCredentials('');
            $scope.isLoggedIn = false;
        }

        function getAccount() {
            Dropbox.accountInfo().then(function(accountInfo) {
                $scope.userDisplayName = accountInfo.name_details.familiar_name;
                $toast.show('Logged in as ' + accountInfo.display_name);

                Dropbox.readdir('/').then(function success(entries) {
                    $scope.files = entries;
                });           
            });
        }

        function showFile(filename) {
            Dropbox.readFile(filename).then(function success(filedata) {
                $scope.content = {
                    title: filename,
                    body: filedata
                };
            });
        }

        function saveFile() {
            var filename = $scope.content.title,
                body = $scope.content.body;

            Dropbox.writeFile(filename, body).then(function success() {
                $toast.show('Saved ' + filename);
            });
        }

        // Try to login when instantiating the controller
        if (localStorage['ngDropbox.oauth']) {
            var oauth = angular.fromJson(localStorage['ngDropbox.oauth']);
            Dropbox.setCredentials(oauth);
            getAccount();
        }
        
        $scope.login = login;
        $scope.logoff = logoff;
        $scope.showFile = showFile;
        $scope.saveFile = saveFile;
    });
