const router = require('express').Router();
const path = require('path');

module.exports = router;

router.get('/', function (req, res) {
    res.sendFile('public/index.html', {
        root: path.join(__dirname, '../..')
    });
})