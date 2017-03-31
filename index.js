'use strict';

const express = require('express');
const port = process.env.PORT || 5000;

let app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => console.log('up on ' + port));