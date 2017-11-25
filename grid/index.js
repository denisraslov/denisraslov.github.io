const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.use(function(req, res) {
    res.sendFile(__dirname + '/dev-index.html');
});

module.exports = app;
