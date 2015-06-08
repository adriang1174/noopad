// Declare the chromeTabsApp module and its dependency 'ui.bootstrap'
var app = angular.module('noo', ['ui.bootstrap']);

app.controller('AppCtrl', ['$scope', function ($scope) {
    
// Tab counter
var counter = 1;
// Array to store the tabs
$scope.tabs = [];

// Add tab to the end of the array
var addTab = function () {
  $scope.tabs.push({ title: 'Tab ' + counter, content: 'Tab ' + counter });
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
$scope.addTab    = addTab;
$scope.removeTab = removeTab;

// For demonstration add 10 tabs
for (var i = 0; i < 10; i++) {
  addTab();
}


  }]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVjbGFyZSB0aGUgY2hyb21lVGFic0FwcCBtb2R1bGUgYW5kIGl0cyBkZXBlbmRlbmN5ICd1aS5ib290c3RyYXAnXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ25vbycsIFsndWkuYm9vdHN0cmFwJ10pO1xuXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xuICAgIFxuLy8gVGFiIGNvdW50ZXJcbnZhciBjb3VudGVyID0gMTtcbi8vIEFycmF5IHRvIHN0b3JlIHRoZSB0YWJzXG4kc2NvcGUudGFicyA9IFtdO1xuXG4vLyBBZGQgdGFiIHRvIHRoZSBlbmQgb2YgdGhlIGFycmF5XG52YXIgYWRkVGFiID0gZnVuY3Rpb24gKCkge1xuICAkc2NvcGUudGFicy5wdXNoKHsgdGl0bGU6ICdUYWIgJyArIGNvdW50ZXIsIGNvbnRlbnQ6ICdUYWIgJyArIGNvdW50ZXIgfSk7XG4gIGNvdW50ZXIrKztcbiAgJHNjb3BlLnRhYnNbJHNjb3BlLnRhYnMubGVuZ3RoIC0gMV0uYWN0aXZlID0gdHJ1ZTtcbn07XG5cbi8vIFJlbW92ZSB0YWIgYnkgaW5kZXhcbnZhciByZW1vdmVUYWIgPSBmdW5jdGlvbiAoZXZlbnQsIGluZGV4KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAkc2NvcGUudGFicy5zcGxpY2UoaW5kZXgsIDEpO1xufTtcblxuLy8gSW5pdGlhbGl6ZSB0aGUgc2NvcGUgZnVuY3Rpb25zXG4kc2NvcGUuYWRkVGFiICAgID0gYWRkVGFiO1xuJHNjb3BlLnJlbW92ZVRhYiA9IHJlbW92ZVRhYjtcblxuLy8gRm9yIGRlbW9uc3RyYXRpb24gYWRkIDEwIHRhYnNcbmZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICBhZGRUYWIoKTtcbn1cblxuXG4gIH1dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==