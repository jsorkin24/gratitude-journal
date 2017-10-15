//  MODULES =================================================

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// CONFIGURATION ===========================================

// set port
const port = process.env.PORT || 8080

// mpromise is depreciated, use native es6 Promise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017', {
    useMongoClient: true
})

// If the Node process ends, close the Mongoose connection
// see: http://theholmesoffice.com/mongoose-connection-best-practice/
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})

// parse application/json
app.use(bodyParser.json());

// ROUTES ==================================================

app.use(require('./app/routes'));
app.use('/public', express.static(path.join(__dirname, 'public'), {
    fallthrough: false
}));
app.use('/public/build', express.static(path.join(__dirname, 'public/build'), {
    fallthrough: false
}));

// START APP  ===============================================
app.listen(port, () => {
    console.log(`Magic happens on port ${port}`);
});