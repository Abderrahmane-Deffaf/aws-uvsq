var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { queryString } = require('./routers/query-string');
const bodyP = require("body-parser");
const { formData } = require('./routers/form-data');
const {getHeaders} = require('./routers/headers');

var app = express();

app.use(bodyP.urlencoded({ extended: false }));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/s", express.static(path.join(__dirname, 'static')));

app.use('/query_string', queryString);
app.post('/form_data', formData) ; 

app.use("/headres", getHeaders);

app.use('^/$', (req, res) => {
  res.send("hi from reflecteur");
});

app.use('/*', (req, res) => {
  res.status(404).send("Not Found");
});

module.exports = app;
