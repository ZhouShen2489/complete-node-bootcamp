const fs = require("fs");
const http = require("http");
const url = require("url");

////////////////////////////
//files

// // blocking synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}.`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written");

// // asynchronous non-blocking
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   if (err) return console.log("Error!😭");
//   console.log(data);
// });

// console.log("Reading file...");

///////////////////////
// SERVER & ROUTING

// only get and parse the data once at the beginning
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productInfo = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW!");
  } else if (pathName === "/api") {
    // parse the json, get product info
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  // res.end("API");
  else if (pathName === "/products") {
    res.end("This is the PRODUCT!");
  } else {
    // response headers must be in front of the res.end. Header can includes some meta data
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening to requests on port 3000");
});
