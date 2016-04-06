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
