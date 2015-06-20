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

angular.module('noopad').factory('contentService', function () {
    'use strict';
    return { 
        content: 'tada'
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRlbnQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnbm9vcGFkJywgWyd1aS5ib290c3RyYXAnXSk7XG5cbmFwcC5jb250cm9sbGVyKCdBcHBDdHJsJywgWyckc2NvcGUnLCAnY29udGVudFNlcnZpY2UnLFxuICAgIGZ1bmN0aW9uICgkc2NvcGUsIGNvbnRlbnRTZXJ2aWNlKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcblxuXG4gICAgICAgICRzY29wZS5jb250ZW50ID0ge1xuICAgICAgICAgICAgdGl0bGU6IGNvbnRlbnRTZXJ2aWNlLmNvbnRlbnQsXG4gICAgICAgICAgICBib2R5OiAnT25lIG9mIHRoZSBhd2Vzb21lIHRoaW5ncyBhYm91dCBBbmd1bGFySlMgaXMgaXRzIHVzYWJpbGl0eSByaWdodCBvdXQgb2YgdGhlIGJveC4gJyArIFxuICAgICAgICAgICAgICAgICAgJ1ZlcnkgbGl0dGxlIGluZm9ybWF0aW9uIGFib3V0IGhvdyB0aGUgZnJhbWV3b3JrIG9wZXJhdGVzIGlzIG5lZWRlZCB0byBnZXQgdXAgYW5kIHJ1bm5pbmcgd2l0aCB5b3VyIGZpcnN0IGFwcGxpY2F0aW9uLidcbiAgICAgICAgfTtcblxuICAgIH1cbl0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ25vb3BhZCcpLmZhY3RvcnkoJ2NvbnRlbnRTZXJ2aWNlJywgZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICByZXR1cm4geyBcbiAgICAgICAgY29udGVudDogJ3RhZGEnXG4gICAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9