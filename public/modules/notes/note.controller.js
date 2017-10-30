(function () {
    'use strict';
    angular
        .module('app.notes')
        .controller('noteController', NoteController);

    NoteController.$inject = ['noteService', 'notes']

    function NoteController(noteService, notes) {
        'use strict'
        var vm = this;
        vm.date = new Date();
        vm.items = notes;
        vm.submitButton = 'start the day'


        vm.submit = () => {
            if (vm.item._id) {
                noteService.update(vm.item)
                    .then(_onSuccess)
                    .catch(_onError);
            } else {
                noteService.insert(vm.item)
                    .then(_onSuccess)
                    .catch(_onError)
            }
        }

        vm.delete = (id) => {
            noteService.remove(id)
                .then(_onDeleteSuccess)
                .catch(_onError)
        }

        vm.edit = (id) => {
            vm.submitButton = 'update'
            noteService.getById(id)
                .then(_onGetByIdSuccess)
                .catch(_onError)
        }

        function _onGetByIdSuccess(data) {
            vm.item = data.item;

        }

        function _onDeleteSuccess() {
            let allPostsList = vm.items;
            let removeIndex = allPostsList.findIndex(
                (element, index, allPostsList) => {
                    return element._id === vm.items._id;
                }
            );
            allPostsList.splice(removeIndex, 1);
            vm.item = null;
        }


        function _onSuccess(data) {
            vm.item = null;
            // location.reload();

        }

        function _onError(data) {
            console.log(`Error: ${data.errors}`);
        };
    }
})();