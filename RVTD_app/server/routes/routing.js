const { Router } = require("express");

const routing = new Router();

routing.get("/", (request, response, next) => {
  response.end(
    "<html><body><h1>Welcome, to get started change URL.</h1><p>=> http://localhost:5000/people/[YourRequestHere]</p><p>for all data you may choose</p><p>=> 'http://localhost:5000/people//json'</p><p>or select a specific user data with proper 'id # such as:</p><p>=> http://localhost:5000/people/36'</p></html></body>"
  );
});

module.exports = routing;
