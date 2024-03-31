const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock!`);
});

myEmitter.emit("newSale", 9);

////////////////
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request received");
  console.log(req.url);
  res.end("Request Received!");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Waiting for request...");
});
