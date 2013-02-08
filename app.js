
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');
var CONFIG = require('config');
var log4js = require('log4js');
var _ = require('underscore');

var constants = require('./lib/constants');
var logger = require(LIB_DIR + 'log_factory').create("app");

/**
 * Initialize App
 */
var app = express();

var port = 8080;

app.configure(function(){
  app.set('port', port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout : false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(function(err, req, res, next) {
	  // only handle `next(err)` calls
	  console.log("Error occurred");
	  logger.error(err);
	  next();
  });
});

/**
 * Routes
 */
require('./routes')(app);


/**
 * Initialize the Server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

logger.info("Started with settings : " + JSON.stringify(app.settings));