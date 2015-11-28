/*jshint camelcase: false */

var app = angular.module('noopad', ['dropbox', 'noopad.config', 'ngMaterialize']);

app.config(function(DropboxProvider, noopadConfig) {
        'use strict';
        DropboxProvider.config(noopadConfig.dropboxApiKey, noopadConfig.baseUrl + 'callback.html');
    });
    
app.controller('nooController', function(Dropbox, $window, $toast) {
        'use strict';
        var vm = this;

        function login() {
            Dropbox.authenticate().then(function success(oauth) {
                if (oauth.uid) {
                    localStorage['ngDropbox.oauth'] = angular.toJson(oauth);
                    vm.isLoggedIn = true;
                    getAccount();
                } else {
                    $window.console.log('Missing oauth token!');
                    vm.isLoggedIn = false;
                }

            }, function error(reason) {
                vm.isLoggedIn = false;
                $toast.show('Authentication failed with: ' + reason);
            });
        }

        function logoff() {
            localStorage.removeItem('ngDropbox.oauth');
            Dropbox.setCredentials('');
            vm.isLoggedIn = false;
        }

        function getAccount() {
            Dropbox.accountInfo().then(function(accountInfo) {
                $toast.show('Logged in as ' + accountInfo.display_name);
                Dropbox.readdir('/').then(function success(entries) {
                    vm.files = entries;
                });           
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

        // Try to login when instantiating the controller
        if (localStorage['ngDropbox.oauth']) {
            var oauth = angular.fromJson(localStorage['ngDropbox.oauth']);
            Dropbox.setCredentials(oauth);
            vm.isLoggedIn = true;
            getAccount();
        }
        
        vm.login = login;
        vm.logoff = logoff;
        vm.showFile = showFile;
        vm.saveFile = saveFile;
    });
