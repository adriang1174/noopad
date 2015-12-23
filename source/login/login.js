(function () {
    'use strict';
    
    var app = angular.module('noopad');
    app.controller('loginController', function ($location, $toast, $window, Dropbox, noopadKey) {
        var vm = this;

        vm.login = function () {
            Dropbox.authenticate().then(function success(oauth) {
                if (oauth.uid) {
                    localStorage[noopadKey] = angular.toJson(oauth);
                    $location.path('/editor');
                } else {
                    $window.console.log('Missing oauth token!');
                }
            }, function error(reason) {
                $toast.show('Authentication failed with: ' + reason);
            });
        };

        // If we already have an auth go directly to editor
        if (localStorage[noopadKey]) {
            $location.path('/editor');
        }
    });
})();
