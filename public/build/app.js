/* global $ angular */
'use strict';

$(function () {
    // moment.js default language
    // moment.locale('en')

    angular.bootstrap(document, ['app']);
});
'use strict';

(function () {
    'use strict';

    angular.module('app', ['ui.router', 'ui.bootstrap']).config(RouteConfig).run();

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);

        RouteConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('app', ['ui.router']).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state("app", {
            url: "/",
            abstract: true,
            resolve: {
                getAllNotes: getAllNotes
            }
        });
    };
})();

function getAllNotes(noteService) {
    return noteService.getAll().then(function (data) {
        return data.items;
    }).catch(function (error) {
        console.log(error);
    });
}
'use strict';

(function () {
    'use strict';

    angular.module('app').controller('noteController', NoteController);

    NoteController.$inject = ['noteService'];

    function NoteController(noteService) {
        'use strict';

        var vm = this;
        vm.date = new Date();

        vm.submit = function () {
            debugger;
            noteService.insert(vm.item).then(_onSendSuccess).catch(_onError);
        };

        function _onSendSuccess(data) {
            debugger;
            vm.item = null;
            // vm.fundingProposalForm.$setPristine();
            // toastr.success('Proposal Sent for Review');
        }

        function _onError(data) {
            console.log('Error: ' + data.errors);
        };
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('app').factory('noteService', NoteServiceFactory);

    NoteServiceFactory.$inject = ['$http', '$q'];

    function NoteServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert

        };

        function getAll() {
            return $http.get('/api/notes?active=true').then(xhrSuccess).catch(onError);
        }

        function getById(id, onSuccess, onError) {
            return $http.get('/api/notes/' + id).then(xhrSuccess).catch(onError);
        }

        function insert(itemData, onSuccess, onError) {
            return $http.post('/api/notes', itemData).then(xhrSuccess).catch(onError);
        }

        function xhrSuccess(response) {
            return response.data;
        }

        function onError(error) {
            console.log(error.data);
            return $q.reject(error.data);
        }
    }
})();