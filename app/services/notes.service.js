module.exports = notesService

function notesService(options) {
    let note
    if (!options.noteModelService) {
        throw new Error('Options.modelService is required')
    }

    Note = options.noteModelService

    return {
        getAll: getAll,
        getOne: getOne,
        insert: insert,
        updateOne: updateOne,
        removeOne: removeOne

    }

    function getAll(req, res) {
        let notes = Note.find()
        if (req.query.active) {
            notes.where('isArchived').eq(false)
        }
        return notes;
    }


    function getOne(queryCondition) {
        return Note.findOne(queryCondition)
    }

    function insert(document) {
        let note = new Note(document)
        return note.save()
    }

    function updateOne(queryCondition, note) {
        return Note.findOneAndUpdate(queryCondition, note, {
            new: true
        })
    }

    function removeOne(queryCondition) {
        return Note.findOneAndRemove(queryCondition)
    }

}