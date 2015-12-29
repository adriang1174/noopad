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
