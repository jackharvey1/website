'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const hbs = require('hbs');

const app = express();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'public/views/partials'));

app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'public/views/master.hbs'));
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening');
});
