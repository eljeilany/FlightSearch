var request = require('request')

module.exports = function (req,res) {
  request({
      url: "http://node.locomote.com/code-task/airlines",
      json: true
  },function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json(body);
    } else {
      console.log(error);
    }
  })
}
