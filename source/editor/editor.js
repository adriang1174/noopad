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
            vm.save();
            event.preventDefault();
          }
        });

        function logoff() {
            localStorage.removeItem(noopadKey);
            Dropbox.setCredentials('');
            $location.path('/login');
        }

        function refresh(message) {
            $toast.show(message);
            Dropbox.readdir('/').then(function success(entries) {
                vm.files = entries;
            });
        }

        function getAccount() {
            Dropbox.accountInfo().then(function (accountInfo) {
                refresh('Logged in as ' + accountInfo.display_name);
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

        function save() {
            var filename = vm.content.title,
                body = vm.content.body;
            if (vm.contentForm.$valid) {
                Dropbox.writeFile(filename, body).then(function success() {
                    refresh('Saved ' + filename);
                });                
            }
        }

        function deleteFile() {
            var filename = vm.content.title;
            Dropbox.delete(filename).then(function success() {
                refresh('Deleted ' + filename);
                resetForm();
            });
        }

        function resetForm() {
            vm.content = {
                title: '',
                body: '',
                markdownBody: ''
            };
            vm.contentForm.title.$setDirty();             
        }

        function flip() {
            vm.flipped = !vm.flipped;
            vm.content.markdownBody = marked(vm.content.body);
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

        setupEditor();

        vm.flipped = false;
        vm.flip = flip;
        vm.readFile = readFile;
        vm.logoff = logoff;
        vm.save = save;
        vm.resetForm = resetForm;
        vm.deleteFile = deleteFile;
    });

})();
