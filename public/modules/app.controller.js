(function () {
    'use strict';
    angular
        .module('app')
        .controller('appController', AppController);

    function AppController() {

        var vm = this;
        vm.name = 'JANE';
        vm.date = new Date();
    }
})();