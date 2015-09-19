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
