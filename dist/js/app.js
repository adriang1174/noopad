var app = angular.module('noopad', ['ui.bootstrap', 'dropbox', 'config']);

app.config(function(DropboxProvider, config) {
        'use strict';
        DropboxProvider.config(config.dropboxApiKey, config.baseUrl + 'callback.html');
    })
    .controller('AppController', function($scope, Dropbox, $window) {
        'use strict';

        function login() {
            $window.console.log('doing login');
            Dropbox.authenticate().then(function(credentials) {
                $window.console.log('Success: ' + credentials.access_token);
            }, function(reason) {
                $window.console.log('Failed: ' + reason);
            }, function(update) {
                $window.console.log('Got notification: ' + update);
            });
        }

        function info() {
            $window.console.log('doing info');
            Dropbox.accountInfo().then(function(accountInfo) {
                $window.console.log(accountInfo.display_name);
            });
        }

        $scope.content = {
            title: 'Dropbox Account',
            body: 'body'
        };

        $scope.isLoggedIn = Dropbox.isAuthenticated();
        $scope.authenticate = login;
        $scope.getInfo = info;
    });

angular.module('config', [])
.constant('config', {
    'baseUrl' : 'http://localhost:8080/dist/',
    'dropboxApiKey' : '0v2on491jcvssod',
});

// angular.module('noopad')
//     .config(function(DropboxProvider, config) {
//         'use strict';
//        DropboxProvider.config(config.dropboxApiKey, config.baseUrl + 'callback.html');
//     })
//     .factory('contentService', function(Dropbox) {
//         'use strict';

//         var content = {};

//         content.body = '---';
//         function getInfo() {
//             console.log('yyoyo');

//             Dropbox.accountInfo().then(function(accountInfo) {
// console.log('yyoyo2');

//                 content.body = accountInfo.display_name;
//             });
//         }
//         return {
//             getInfo: getInfo,
//             content: content,
//             authenticate: Dropbox.authenticate,
//             isAuthenticated: Dropbox.isAuthenticated()
//         };
//     });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyIsImNvbnRlbnQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ25vb3BhZCcsIFsndWkuYm9vdHN0cmFwJywgJ2Ryb3Bib3gnLCAnY29uZmlnJ10pO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKERyb3Bib3hQcm92aWRlciwgY29uZmlnKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgRHJvcGJveFByb3ZpZGVyLmNvbmZpZyhjb25maWcuZHJvcGJveEFwaUtleSwgY29uZmlnLmJhc2VVcmwgKyAnY2FsbGJhY2suaHRtbCcpO1xuICAgIH0pXG4gICAgLmNvbnRyb2xsZXIoJ0FwcENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsIERyb3Bib3gsICR3aW5kb3cpIHtcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgICAgIGZ1bmN0aW9uIGxvZ2luKCkge1xuICAgICAgICAgICAgJHdpbmRvdy5jb25zb2xlLmxvZygnZG9pbmcgbG9naW4nKTtcbiAgICAgICAgICAgIERyb3Bib3guYXV0aGVudGljYXRlKCkudGhlbihmdW5jdGlvbihjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgICR3aW5kb3cuY29uc29sZS5sb2coJ1N1Y2Nlc3M6ICcgKyBjcmVkZW50aWFscy5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgJHdpbmRvdy5jb25zb2xlLmxvZygnRmFpbGVkOiAnICsgcmVhc29uKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICR3aW5kb3cuY29uc29sZS5sb2coJ0dvdCBub3RpZmljYXRpb246ICcgKyB1cGRhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbmZvKCkge1xuICAgICAgICAgICAgJHdpbmRvdy5jb25zb2xlLmxvZygnZG9pbmcgaW5mbycpO1xuICAgICAgICAgICAgRHJvcGJveC5hY2NvdW50SW5mbygpLnRoZW4oZnVuY3Rpb24oYWNjb3VudEluZm8pIHtcbiAgICAgICAgICAgICAgICAkd2luZG93LmNvbnNvbGUubG9nKGFjY291bnRJbmZvLmRpc3BsYXlfbmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jb250ZW50ID0ge1xuICAgICAgICAgICAgdGl0bGU6ICdEcm9wYm94IEFjY291bnQnLFxuICAgICAgICAgICAgYm9keTogJ2JvZHknXG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmlzTG9nZ2VkSW4gPSBEcm9wYm94LmlzQXV0aGVudGljYXRlZCgpO1xuICAgICAgICAkc2NvcGUuYXV0aGVudGljYXRlID0gbG9naW47XG4gICAgICAgICRzY29wZS5nZXRJbmZvID0gaW5mbztcbiAgICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjb25maWcnLCBbXSlcbi5jb25zdGFudCgnY29uZmlnJywge1xuICAgICdiYXNlVXJsJyA6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvZGlzdC8nLFxuICAgICdkcm9wYm94QXBpS2V5JyA6ICcwdjJvbjQ5MWpjdnNzb2QnLFxufSk7XG4iLCIvLyBhbmd1bGFyLm1vZHVsZSgnbm9vcGFkJylcbi8vICAgICAuY29uZmlnKGZ1bmN0aW9uKERyb3Bib3hQcm92aWRlciwgY29uZmlnKSB7XG4vLyAgICAgICAgICd1c2Ugc3RyaWN0Jztcbi8vICAgICAgICBEcm9wYm94UHJvdmlkZXIuY29uZmlnKGNvbmZpZy5kcm9wYm94QXBpS2V5LCBjb25maWcuYmFzZVVybCArICdjYWxsYmFjay5odG1sJyk7XG4vLyAgICAgfSlcbi8vICAgICAuZmFjdG9yeSgnY29udGVudFNlcnZpY2UnLCBmdW5jdGlvbihEcm9wYm94KSB7XG4vLyAgICAgICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgICAgICB2YXIgY29udGVudCA9IHt9O1xuXG4vLyAgICAgICAgIGNvbnRlbnQuYm9keSA9ICctLS0nO1xuLy8gICAgICAgICBmdW5jdGlvbiBnZXRJbmZvKCkge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3l5b3lvJyk7XG5cbi8vICAgICAgICAgICAgIERyb3Bib3guYWNjb3VudEluZm8oKS50aGVuKGZ1bmN0aW9uKGFjY291bnRJbmZvKSB7XG4vLyBjb25zb2xlLmxvZygneXlveW8yJyk7XG5cbi8vICAgICAgICAgICAgICAgICBjb250ZW50LmJvZHkgPSBhY2NvdW50SW5mby5kaXNwbGF5X25hbWU7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgZ2V0SW5mbzogZ2V0SW5mbyxcbi8vICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXG4vLyAgICAgICAgICAgICBhdXRoZW50aWNhdGU6IERyb3Bib3guYXV0aGVudGljYXRlLFxuLy8gICAgICAgICAgICAgaXNBdXRoZW50aWNhdGVkOiBEcm9wYm94LmlzQXV0aGVudGljYXRlZCgpXG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=