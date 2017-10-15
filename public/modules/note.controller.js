(function () {
    'use strict';
    angular
        .module('app')
        .controller('noteController', NoteController);

    NoteController.$inject = ['noteService']

    function NoteController(noteService) {
        'use strict'
        var vm = this;
        vm.date = new Date();

        vm.submit = () => {
            debugger;
            noteService.insert(vm.item)
                .then(_onSendSuccess)
                .catch(_onError)
        }

        function _onSendSuccess(data) {
            debugger;
            vm.item = null;
            // vm.fundingProposalForm.$setPristine();
            // toastr.success('Proposal Sent for Review');
        }

        function _onError(data) {
            console.log(`Error: ${data.errors}`);
        };
    }
})();