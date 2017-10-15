const responses = require('../models/responses')
const path = require('path')
const apiPrefix = '/api/notes'
const noteModel = require('../models/note')
const noteService = require('../services/notes.service')({
    noteModelService: noteModel
})

module.exports = notesController

function notesController() {
    return {
        getAll: getAll,
        getOneById: getOneById,
        insert: insert,
        updateById: updateById,
        removeById: removeById
    }

    function getAll(req, res) {
        noteService
            .getAll(req, res)
            .then(notes => {
                const responseModel = new responses.ItemsResponse();
                responseModel.items = notes;
                res.json(responseModel);
            })
            .catch(err => {
                res.status(500).send(new responses.ErrorResponse(err));
            });
    }

    function getOneById(req, res) {
        let queryCondition = {
            _id: req.params.id
        };

        noteService
            .getOne(queryCondition)
            .then(notes => {
                const responseModel = new responses.ItemResponse();
                responseModel.item = notes;
                res.json(responseModel);
            })
            .catch(err => {
                return res.status(500).send(new responses.ErrorResponse(err));
            });
    }

    function insert(req, res) {
        noteService
            .insert(req.body)
            .then(notes => {
                const responseModel = new responses.ItemResponse();
                responseModel.item = notes;
                res
                    .status(201)
                    .location(path.join(apiPrefix, notes._id.toString()))
                    .json(responseModel);
            })
            .catch(err => {
                return res.status(500).send(new responses.ErrorResponse(err));
            });
    }

    function updateById(req, res) {
        let queryCondition = {
            _id: req.params.id
        };
        noteService
            .updateOne(queryCondition, req.body)
            .then(notes => {
                const responseModel = new responses.ItemResponse();
                res.status(204).json(responseModel);
            })
            .catch(err => {
                return res.status(500).send(new responses.ErrorResponse(err.stack));
            });
    }

    function removeById(req, res) {
        let queryCondition = {
            _id: req.params.id
        };
        noteService
            .removeOne(queryCondition)
            .then(notes => {
                const responseModel = new responses.ItemResponse();
                responseModel.item = notes;
                res.json(responseModel);
            })
            .catch(err => {
                return res.status(500).send(new responses.ErrorResponse(err));
            });
    }

}