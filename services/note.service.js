(function () {
    'use strict'

    angular.module('app')
        .factory('noteService', NoteServiceFactory)

    NoteServiceFactory.$inject = ['$http', '$q']

    function NoteServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById
        }

        function getAll() {
            return $http.get('/api/notes?active=true')
                .then(xhrSuccess)
                .catch(onError)
        }

        function getById(id, onSuccess, onError) {
            return $http.get(`/api/notes/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
            console.log(error.data);
            return $q.reject(error.data)
        }
    }
})();