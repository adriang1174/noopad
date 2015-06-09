// Declare the chromeTabsApp module and its dependency 'ui.bootstrap'
var app = angular.module('noo', ['ui.bootstrap']);

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

app.directive('tabHighlight', [

    function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Here is the major jQuery usage where we add the event
                // listeners mousemove and mouseout on the tabs to initalize
                // the moving highlight for the inactive tabs
                var x, y, initial_background = '#c3d5e6';

                element
                    .removeAttr('style')
                    .mousemove(function (e) {
                        // Add highlight effect on inactive tabs
                        if (!element.hasClass('active')) {
                            x = e.pageX - this.offsetLeft;
                            y = e.pageY - this.offsetTop;

                            // Set the background when mouse moves over inactive tabs
                            element
                                .css({
                                    background: '-moz-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background
                                })
                                .css({
                                    background: '-webkit-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background
                                })
                                .css({
                                    background: 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background
                                });
                        }
                    })
                    .mouseout(function () {
                        // Return the inital background color of the tab
                        element.removeAttr('style');
                    });
            }
        };
    }
]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlY2xhcmUgdGhlIGNocm9tZVRhYnNBcHAgbW9kdWxlIGFuZCBpdHMgZGVwZW5kZW5jeSAndWkuYm9vdHN0cmFwJ1xudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdub28nLCBbJ3VpLmJvb3RzdHJhcCddKTtcblxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBbJyRzY29wZScsXG4gICAgZnVuY3Rpb24gKCRzY29wZSkge1xuXG4gICAgICAgIC8vIFRhYiBjb3VudGVyXG4gICAgICAgIHZhciBjb3VudGVyID0gMTtcbiAgICAgICAgLy8gQXJyYXkgdG8gc3RvcmUgdGhlIHRhYnNcbiAgICAgICAgJHNjb3BlLnRhYnMgPSBbXTtcblxuICAgICAgICAvLyBBZGQgdGFiIHRvIHRoZSBlbmQgb2YgdGhlIGFycmF5XG4gICAgICAgIHZhciBhZGRUYWIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc2NvcGUudGFicy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1RhYiAnICsgY291bnRlcixcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnVGFiICcgKyBjb3VudGVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgICRzY29wZS50YWJzWyRzY29wZS50YWJzLmxlbmd0aCAtIDFdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRhYiBieSBpbmRleFxuICAgICAgICB2YXIgcmVtb3ZlVGFiID0gZnVuY3Rpb24gKGV2ZW50LCBpbmRleCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgJHNjb3BlLnRhYnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBzY29wZSBmdW5jdGlvbnNcbiAgICAgICAgJHNjb3BlLmFkZFRhYiA9IGFkZFRhYjtcbiAgICAgICAgJHNjb3BlLnJlbW92ZVRhYiA9IHJlbW92ZVRhYjtcblxuICAgICAgICAvLyBGb3IgZGVtb25zdHJhdGlvbiBhZGQgMTAgdGFic1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGFkZFRhYigpO1xuICAgICAgICB9XG4gICAgfVxuXSk7XG5cbmFwcC5kaXJlY3RpdmUoJ3RhYkhpZ2hsaWdodCcsIFtcblxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBIZXJlIGlzIHRoZSBtYWpvciBqUXVlcnkgdXNhZ2Ugd2hlcmUgd2UgYWRkIHRoZSBldmVudFxuICAgICAgICAgICAgICAgIC8vIGxpc3RlbmVycyBtb3VzZW1vdmUgYW5kIG1vdXNlb3V0IG9uIHRoZSB0YWJzIHRvIGluaXRhbGl6ZVxuICAgICAgICAgICAgICAgIC8vIHRoZSBtb3ZpbmcgaGlnaGxpZ2h0IGZvciB0aGUgaW5hY3RpdmUgdGFic1xuICAgICAgICAgICAgICAgIHZhciB4LCB5LCBpbml0aWFsX2JhY2tncm91bmQgPSAnI2MzZDVlNic7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAgICAgICAgIC5tb3VzZW1vdmUoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBoaWdobGlnaHQgZWZmZWN0IG9uIGluYWN0aXZlIHRhYnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4ID0gZS5wYWdlWCAtIHRoaXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ID0gZS5wYWdlWSAtIHRoaXMub2Zmc2V0VG9wO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBiYWNrZ3JvdW5kIHdoZW4gbW91c2UgbW92ZXMgb3ZlciBpbmFjdGl2ZSB0YWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICctbW96LXJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgJyArIHggKyAncHggJyArIHkgKyAncHgsIHJnYmEoMjU1LDI1NSwyNTUsMC40KSAwcHgsIHJnYmEoMjU1LDI1NSwyNTUsMC4wKSA0NXB4KSwgJyArIGluaXRpYWxfYmFja2dyb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICctd2Via2l0LXJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgJyArIHggKyAncHggJyArIHkgKyAncHgsIHJnYmEoMjU1LDI1NSwyNTUsMC40KSAwcHgsIHJnYmEoMjU1LDI1NSwyNTUsMC4wKSA0NXB4KSwgJyArIGluaXRpYWxfYmFja2dyb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0ICcgKyB4ICsgJ3B4ICcgKyB5ICsgJ3B4LCByZ2JhKDI1NSwyNTUsMjU1LDAuNCkgMHB4LCByZ2JhKDI1NSwyNTUsMjU1LDAuMCkgNDVweCksICcgKyBpbml0aWFsX2JhY2tncm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5tb3VzZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluaXRhbCBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSB0YWJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=