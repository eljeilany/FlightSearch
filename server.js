
var express    = require('express');
var bodyParser = require('body-parser');
var airplains = require('./controllers/airplains');
var airports = require('./controllers/airports');
var search = require('./controllers/search');

var app        = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = 3000;

var router = express.Router();




// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// router.get('/', function(req, res) {
// 	res.json({ message: 'call /' });
// });

// on routes that end in
// ----------------------------------------------------
router.route('/airlines')
	.get(function(req, res) {
		airplains(req,res)
	});

// // on routes that end in
// // ----------------------------------------------------
// router.route('/airlines')
//
// 	.post(function(req, res) {
// 		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
// 		res.json({ message: Nodes});
// 	})
//
// 	.get(function(req, res) {
// 		res.json({ message: Nodes });
// 	});

// on routes that end in
// ----------------------------------------------------
router.route('/airports')
	.get(function(req, res,next) {
		airports(req,res,next)
	});

// on routes that end in
// ----------------------------------------------------
router.route('/search')
	.get(function(req, res,next) {
		search(req,res,next)
	});

// ----------------------------------------------------

app.use('/api', router);
app.use('/', express.static(__dirname + '/public'));
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Master listening on port ' + port);
