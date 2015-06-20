var app = angular.module('noopad', ['ui.bootstrap']);

app.controller('AppCtrl', ['$scope', 'contentService',
    function ($scope, contentService) {
        'use strict';


        $scope.content = {
            title: contentService.content,
            body: 'One of the awesome things about AngularJS is its usability right out of the box. ' + 
                  'Very little information about how the framework operates is needed to get up and running with your first application.'
        };

    }
]);
