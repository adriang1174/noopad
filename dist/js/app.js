// Declare the chromeTabsApp module and its dependency 'ui.bootstrap'
var app = angular.module('noopad', ['ui.bootstrap']);

app.controller('AppCtrl', ['$scope',
    function ($scope) {

        // Tab counter
        var counter = 1;
        // Array to store the tabs
        $scope.tabs = [];

        // Add tab to the end of the array
        var addTab = function () {
            $scope.tabs.push({
                title: 'Tab ' + counter,
                content: 'Tab ' + counter
            });
            counter++;
            $scope.tabs[$scope.tabs.length - 1].active = true;
        };

        // Remove tab by index
        var removeTab = function (event, index) {
            event.preventDefault();
            event.stopPropagation();
            $scope.tabs.splice(index, 1);
        };

        // Initialize the scope functions
        $scope.addTab = addTab;
        $scope.removeTab = removeTab;

        // For demonstration add 10 tabs
        for (var i = 0; i < 10; i++) {
            addTab();
        }
    }
]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVjbGFyZSB0aGUgY2hyb21lVGFic0FwcCBtb2R1bGUgYW5kIGl0cyBkZXBlbmRlbmN5ICd1aS5ib290c3RyYXAnXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ25vb3BhZCcsIFsndWkuYm9vdHN0cmFwJ10pO1xuXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIFsnJHNjb3BlJyxcbiAgICBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cbiAgICAgICAgLy8gVGFiIGNvdW50ZXJcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAxO1xuICAgICAgICAvLyBBcnJheSB0byBzdG9yZSB0aGUgdGFic1xuICAgICAgICAkc2NvcGUudGFicyA9IFtdO1xuXG4gICAgICAgIC8vIEFkZCB0YWIgdG8gdGhlIGVuZCBvZiB0aGUgYXJyYXlcbiAgICAgICAgdmFyIGFkZFRhYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRzY29wZS50YWJzLnB1c2goe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnVGFiICcgKyBjb3VudGVyLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdUYWIgJyArIGNvdW50ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgICAgJHNjb3BlLnRhYnNbJHNjb3BlLnRhYnMubGVuZ3RoIC0gMV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBSZW1vdmUgdGFiIGJ5IGluZGV4XG4gICAgICAgIHZhciByZW1vdmVUYWIgPSBmdW5jdGlvbiAoZXZlbnQsIGluZGV4KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAkc2NvcGUudGFicy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHNjb3BlIGZ1bmN0aW9uc1xuICAgICAgICAkc2NvcGUuYWRkVGFiID0gYWRkVGFiO1xuICAgICAgICAkc2NvcGUucmVtb3ZlVGFiID0gcmVtb3ZlVGFiO1xuXG4gICAgICAgIC8vIEZvciBkZW1vbnN0cmF0aW9uIGFkZCAxMCB0YWJzXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgYWRkVGFiKCk7XG4gICAgICAgIH1cbiAgICB9XG5dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==