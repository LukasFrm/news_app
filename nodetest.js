var request = require("request");
var headers = {
  Authorization: "Token b65cb01e89e89151731d2185680ec18655acac73"
};
var options = {
  url: "https://imbrikapi.fr/api/articles?q=blockchain",
  headers: headers
};
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
}
request(options, callback);
