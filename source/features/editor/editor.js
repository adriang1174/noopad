/*jshint camelcase: false */
(function () {
    'use strict';
    
    var app = angular.module('noopad');
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
            vm.content.markdownBody = marked(vm.content.body);
        }

        setupEditor();

        vm.flipped = false;
        vm.flip = flip;
        vm.readFile = readFile;
        vm.logoff = logoff;
        vm.saveFile = saveFile;
    });

})();
