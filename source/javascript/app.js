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
