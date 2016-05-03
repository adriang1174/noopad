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
                templateUrl: 'login/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/editor', {
                templateUrl: 'editor/editor.html',
                controller: 'editorController',
                controllerAs: 'vm',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/login'
            });
    });

    app.config(function (markedProvider) {
        markedProvider.setOptions({ 
            gfm: true 
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

 })();

angular.module("noopad.config", [])
.constant("noopadConfig", {"baseUrl":"https://bangkarlsen.github.io/noopad/","dropboxApiKey":"0v2on491jcvssod"});

/*jshint camelcase: false */
(function () {
    'use strict';

    angular.module('noopad')
        .controller('editorController', function (Dropbox, $window, $modal, $toast, $location, noopadKey, hotkeys, marked) {
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

            function resetForm() {
                vm.content = {
                    title: '',
                    body: '',
                    markdownBody: ''
                };
                vm.contentForm.title.$setDirty();             
            }

            function deleteFile() {
                var filename = vm.content.title;
                Dropbox.delete(filename).then(function success() {
                    refresh('Deleted ' + filename);
                    resetForm();
                });
            }

            function confirmDelete($event) {
                var modalInstance = $modal.open({
                    templateUrl: 'modals/confirmDelete.html',
                    anchorElement: $event ? angular.element($event.target) : undefined,
                    controller: 'confirmDeleteCtrl',
                });
                modalInstance.result.then(deleteFile);
            }

            function flip() {
                vm.flipped = !vm.flipped;
                vm.content.markdownBody = marked(vm.content.body);
            }

            function setup() {
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

            setup();

            vm.flipped = false;
            vm.flip = flip;
            vm.readFile = readFile;
            vm.logoff = logoff;
            vm.save = save;
            vm.resetForm = resetForm;
            vm.confirmDelete = confirmDelete;
        });
})();

(function () {
    'use strict';
    
    angular.module('noopad')
        .controller('loginController', function ($location, $log, $toast, $window, Dropbox, noopadKey) {
            var vm = this;

            function login() {
                Dropbox.authenticate().then(function success(oauth) {
                    if (oauth.uid) {
                        localStorage[noopadKey] = angular.toJson(oauth);
                        $location.path('/editor');
                    } else {
                        $log.error('That\'s weird! Missing oauth token!');
                    }
                }, function error(reason) {
                    $toast.show('Authentication failed with: ' + reason);
                });
            }

            // If we already have an auth go directly to editor
            function setup() {
                if (localStorage[noopadKey]) {
                    $location.path('/editor');
                }            
            }

            setup();

            vm.login = login;
    });
})();

(function () {
    'use strict';

    var app = angular.module('noopad');
    
    app.controller('confirmDeleteCtrl', function ($scope, $modalInstance) {
        $scope.delete = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyIsImVkaXRvci9lZGl0b3IuanMiLCJsb2dpbi9sb2dpbi5qcyIsIm1vZGFscy9jb25maXJtRGVsZXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZFQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qanNoaW50IGNhbWVsY2FzZTogZmFsc2UgKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdub29wYWQnLCBbJ2Ryb3Bib3gnLCAnbm9vcGFkLmNvbmZpZycsICduZ01hdGVyaWFsaXplJywgJ25nUm91dGUnLCAnY2ZwLmhvdGtleXMnLCAnaGMubWFya2VkJ10pO1xuXG4gICAgYXBwLmNvbnN0YW50KCdub29wYWRLZXknLCAnbm9vcGFkLm9hdXRoJyk7XG5cbiAgICBhcHAuY29uZmlnKGZ1bmN0aW9uIChEcm9wYm94UHJvdmlkZXIsIG5vb3BhZENvbmZpZykge1xuICAgICAgICBEcm9wYm94UHJvdmlkZXIuY29uZmlnKG5vb3BhZENvbmZpZy5kcm9wYm94QXBpS2V5LCBub29wYWRDb25maWcuYmFzZVVybCArICdjYWxsYmFjay5odG1sJyk7XG4gICAgfSk7XG5cbiAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xuICAgICAgICAkcm91dGVQcm92aWRlclxuICAgICAgICAgICAgLndoZW4oJy9sb2dpbicsIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2xvZ2luL2xvZ2luLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC53aGVuKCcvZWRpdG9yJywge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZWRpdG9yL2VkaXRvci5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZWRpdG9yQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgICAgICAgICAgIHJlbG9hZE9uU2VhcmNoOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vdGhlcndpc2Uoe1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86ICcvbG9naW4nXG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKG1hcmtlZFByb3ZpZGVyKSB7XG4gICAgICAgIG1hcmtlZFByb3ZpZGVyLnNldE9wdGlvbnMoeyBcbiAgICAgICAgICAgIGdmbTogdHJ1ZSBcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBhcHAuZmlsdGVyKCdlZGl0b3JVcmwnLCBmdW5jdGlvbiAoJHdpbmRvdykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgdmFyIG5vU2xhc2hVcmwgPSB1cmwuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgcmV0dXJuICcjL2VkaXRvcj9mPScgKyAkd2luZG93LmVuY29kZVVSSUNvbXBvbmVudChub1NsYXNoVXJsKTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFwcC5kaXJlY3RpdmUoJ2ZsaXBwZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiZmxpcHBlclwiIG5nLXRyYW5zY2x1ZGUgbmctY2xhc3M9XCJ7IGZsaXBwZWQ6IGZsaXBwZWQgfVwiPjwvZGl2PicsXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBmbGlwcGVkOiAnPSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFwcC5kaXJlY3RpdmUoJ2Zyb250JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiZnJvbnQgdGlsZVwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JyxcbiAgICAgICAgICAgIHRyYW5zY2x1ZGU6IHRydWVcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFwcC5kaXJlY3RpdmUoJ2JhY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJiYWNrIHRpbGVcIiBuZy10cmFuc2NsdWRlPjwvZGl2PicsXG4gICAgICAgICAgICB0cmFuc2NsdWRlOiB0cnVlXG4gICAgICAgIH07XG4gICAgfSk7XG5cbiB9KSgpO1xuIiwiYW5ndWxhci5tb2R1bGUoXCJub29wYWQuY29uZmlnXCIsIFtdKVxuLmNvbnN0YW50KFwibm9vcGFkQ29uZmlnXCIsIHtcImJhc2VVcmxcIjpcImh0dHBzOi8vYmFuZ2thcmxzZW4uZ2l0aHViLmlvL25vb3BhZC9cIixcImRyb3Bib3hBcGlLZXlcIjpcIjB2Mm9uNDkxamN2c3NvZFwifSk7XG4iLCIvKmpzaGludCBjYW1lbGNhc2U6IGZhbHNlICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdub29wYWQnKVxuICAgICAgICAuY29udHJvbGxlcignZWRpdG9yQ29udHJvbGxlcicsIGZ1bmN0aW9uIChEcm9wYm94LCAkd2luZG93LCAkbW9kYWwsICR0b2FzdCwgJGxvY2F0aW9uLCBub29wYWRLZXksIGhvdGtleXMsIG1hcmtlZCkge1xuICAgICAgICAgICAgdmFyIHZtID0gdGhpcztcblxuICAgICAgICAgICAgaG90a2V5cy5hZGQoe1xuICAgICAgICAgICAgICBjb21ibzogWydjb21tYW5kK3MnLCAnY3RybCtzJ10sXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2F2ZSBmaWxlJyxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdm0uc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBsb2dvZmYoKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obm9vcGFkS2V5KTtcbiAgICAgICAgICAgICAgICBEcm9wYm94LnNldENyZWRlbnRpYWxzKCcnKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlZnJlc2gobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICR0b2FzdC5zaG93KG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIERyb3Bib3gucmVhZGRpcignLycpLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhlbnRyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZtLmZpbGVzID0gZW50cmllcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0QWNjb3VudCgpIHtcbiAgICAgICAgICAgICAgICBEcm9wYm94LmFjY291bnRJbmZvKCkudGhlbihmdW5jdGlvbiAoYWNjb3VudEluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaCgnTG9nZ2VkIGluIGFzICcgKyBhY2NvdW50SW5mby5kaXNwbGF5X25hbWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiByZWFkRmlsZShmaWxlbmFtZSkge1xuICAgICAgICAgICAgICAgIERyb3Bib3gucmVhZEZpbGUoZmlsZW5hbWUpLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhmaWxlZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB2bS5jb250ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGZpbGVuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogZmlsZWRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZG93bkJvZHk6IG1hcmtlZChmaWxlZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc2F2ZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZW5hbWUgPSB2bS5jb250ZW50LnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBib2R5ID0gdm0uY29udGVudC5ib2R5O1xuICAgICAgICAgICAgICAgIGlmICh2bS5jb250ZW50Rm9ybS4kdmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgRHJvcGJveC53cml0ZUZpbGUoZmlsZW5hbWUsIGJvZHkpLnRoZW4oZnVuY3Rpb24gc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2goJ1NhdmVkICcgKyBmaWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlc2V0Rm9ybSgpIHtcbiAgICAgICAgICAgICAgICB2bS5jb250ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6ICcnLFxuICAgICAgICAgICAgICAgICAgICBtYXJrZG93bkJvZHk6ICcnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2bS5jb250ZW50Rm9ybS50aXRsZS4kc2V0RGlydHkoKTsgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlbGV0ZUZpbGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGVuYW1lID0gdm0uY29udGVudC50aXRsZTtcbiAgICAgICAgICAgICAgICBEcm9wYm94LmRlbGV0ZShmaWxlbmFtZSkudGhlbihmdW5jdGlvbiBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgICAgICByZWZyZXNoKCdEZWxldGVkICcgKyBmaWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0Rm9ybSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBjb25maXJtRGVsZXRlKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJG1vZGFsLm9wZW4oe1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ21vZGFscy9jb25maXJtRGVsZXRlLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBhbmNob3JFbGVtZW50OiAkZXZlbnQgPyBhbmd1bGFyLmVsZW1lbnQoJGV2ZW50LnRhcmdldCkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjb25maXJtRGVsZXRlQ3RybCcsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihkZWxldGVGaWxlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZmxpcCgpIHtcbiAgICAgICAgICAgICAgICB2bS5mbGlwcGVkID0gIXZtLmZsaXBwZWQ7XG4gICAgICAgICAgICAgICAgdm0uY29udGVudC5tYXJrZG93bkJvZHkgPSBtYXJrZWQodm0uY29udGVudC5ib2R5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZVtub29wYWRLZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYXV0aCA9IGFuZ3VsYXIuZnJvbUpzb24obG9jYWxTdG9yYWdlW25vb3BhZEtleV0pO1xuICAgICAgICAgICAgICAgICAgICBEcm9wYm94LnNldENyZWRlbnRpYWxzKG9hdXRoKTtcbiAgICAgICAgICAgICAgICAgICAgZ2V0QWNjb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJGxvY2F0aW9uLnNlYXJjaCgpLmYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkcm9wYm94TmFtZSA9ICcvJyArICR3aW5kb3cuZGVjb2RlVVJJQ29tcG9uZW50KCRsb2NhdGlvbi5zZWFyY2goKS5mKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRGaWxlKGRyb3Bib3hOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvbG9naW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldHVwKCk7XG5cbiAgICAgICAgICAgIHZtLmZsaXBwZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHZtLmZsaXAgPSBmbGlwO1xuICAgICAgICAgICAgdm0ucmVhZEZpbGUgPSByZWFkRmlsZTtcbiAgICAgICAgICAgIHZtLmxvZ29mZiA9IGxvZ29mZjtcbiAgICAgICAgICAgIHZtLnNhdmUgPSBzYXZlO1xuICAgICAgICAgICAgdm0ucmVzZXRGb3JtID0gcmVzZXRGb3JtO1xuICAgICAgICAgICAgdm0uY29uZmlybURlbGV0ZSA9IGNvbmZpcm1EZWxldGU7XG4gICAgICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIFxuICAgIGFuZ3VsYXIubW9kdWxlKCdub29wYWQnKVxuICAgICAgICAuY29udHJvbGxlcignbG9naW5Db250cm9sbGVyJywgZnVuY3Rpb24gKCRsb2NhdGlvbiwgJGxvZywgJHRvYXN0LCAkd2luZG93LCBEcm9wYm94LCBub29wYWRLZXkpIHtcbiAgICAgICAgICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGxvZ2luKCkge1xuICAgICAgICAgICAgICAgIERyb3Bib3guYXV0aGVudGljYXRlKCkudGhlbihmdW5jdGlvbiBzdWNjZXNzKG9hdXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYXV0aC51aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZVtub29wYWRLZXldID0gYW5ndWxhci50b0pzb24ob2F1dGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9lZGl0b3InKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRsb2cuZXJyb3IoJ1RoYXRcXCdzIHdlaXJkISBNaXNzaW5nIG9hdXRoIHRva2VuIScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gZXJyb3IocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICR0b2FzdC5zaG93KCdBdXRoZW50aWNhdGlvbiBmYWlsZWQgd2l0aDogJyArIHJlYXNvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIHdlIGFscmVhZHkgaGF2ZSBhbiBhdXRoIGdvIGRpcmVjdGx5IHRvIGVkaXRvclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZVtub29wYWRLZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvZWRpdG9yJyk7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXR1cCgpO1xuXG4gICAgICAgICAgICB2bS5sb2dpbiA9IGxvZ2luO1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdub29wYWQnKTtcbiAgICBcbiAgICBhcHAuY29udHJvbGxlcignY29uZmlybURlbGV0ZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCAkbW9kYWxJbnN0YW5jZSkge1xuICAgICAgICAkc2NvcGUuZGVsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
