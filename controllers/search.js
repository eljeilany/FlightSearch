var request = require('request')
var async = require("async");

module.exports = function (req,res,next) {
  var from = req.query.from
  var to = req.query.to
  var date = req.query.date

  airlinesC = []
  fromC = []
  toC = []
  searchQ = []

  async.parallel([
        //Load fromC
        function(callback) {
            request({
                url: "http://node.locomote.com/code-task/airports?q="+from,
                json: true
            },function (error, response, body) {
              if (!error && response.statusCode === 200) {
                fromC = body;
                callback();
              } else {
                return callback(error);
              }
            })
        },
        //Load toC
        function(callback) {
            request({
                url: "http://node.locomote.com/code-task/airports?q="+to,
                json: true
            },function (error, response, body) {
              if (!error && response.statusCode === 200) {
                toC = body;
                callback();
              } else {
                return callback(error);
              }
            })
        }
        ,
        //Load airliners
        function(callback) {
            request({
                url: "http://node.locomote.com/code-task/airlines",
                json: true
            },function (error, response, body) {
              if (!error && response.statusCode === 200) {
                airlinesC = body;
                callback();
              } else {
                return callback(error);
              }
            })
        }
    ], function(err) {
        if (err) return next(err);
        // console.log(airlinesC);
        // console.log(fromC);
        // console.log(toC);
        for (var a = 0; a < airlinesC.length; a++) {
            for (var f = 0; f < fromC.length; f++) {
              for (var t = 0; t < toC.length; t++) {
                var url = 'http://node.locomote.com/code-task/flight_search/'+airlinesC[a].code
                +'?date='+date
                +'&from='+fromC[f].airportCode
                +'&to='+toC[t].airportCode;
                searchQ.push(url);
              }
            }
        }
        console.log(searchQ);
        async.map(searchQ, function(url, callback) {
            // iterator function
            request({
                url: url,
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    callback(null, body);
                } else {
                    callback(error || response.statusCode);
                }
            });
        }, function(err, results) {
            if (err) return next(err);
            console.log(results);
            processedR = []
            for (var i = 0; i < results.length; i++) {
              for (var j = 0; j < results[i].length; j++) {
                processedR.push(results[i][j])
              }
            }
            res.json(processedR)
        });

    });

}
