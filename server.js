/* eslint-disable import/no-extraneous-dependencies */
// server code

const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const reviews = require('./api/reviews.route.js');
const apartments = require('./api/apartments.route.js');
const docs = require('./docs');

const app = express();

app.use(cors());
app.use(express.json());// allows to server to accept json in a body

app.use('/api/v1/reviews', reviews);
app.use('/api/v1/apartments', apartments);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));// if someuse uses a url that is not a path

module.exports = app;
