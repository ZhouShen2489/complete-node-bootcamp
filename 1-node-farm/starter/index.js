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

const replaceCard = (temp, card) => {
  let output = temp.replace(/{%IMAGE%}/g, card.image);
  output = output.replace(/{%PRODUCTNAME%}/g, card.productName);
  output = output.replace(/{%ID%}/g, card.id);
  output = output.replace(/{%FROM%}/g, card.from);
  output = output.replace(/{%NUTRIENTS%}/g, card.nutrients);
  output = output.replace(/{%QUANTITY%}/g, card.quantity);
  output = output.replace(/{%PRICE%}/g, card.price);

  if (!card.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

// only get and parse the data once at the beginning
// HTML Templating
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
// console.log(productInfo);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview Page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardHTML = dataObj
      .map((el) => replaceCard(templateCard, el))
      .join("");
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardHTML);

    res.end(output);
  }

  // Product Page
  else if (pathName === "/api") {
    // parse the json, get product info
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }

  // API
  // res.end("API");
  else if (pathName === "/product") {
    res.end("This is the PRODUCT!");
  }

  // Not Found
  else {
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
