// server.js
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Serve index.html
  if (req.method === "GET" && req.url === "/") {
    const filePath = path.join(__dirname, "index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading index.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
    return;
  }

  // Serve client.js
  if (req.method === "GET" && req.url === "/client.js") {
    const filePath = path.join(__dirname, "client.js");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("client.js not found");
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(data);
      }
    });
    return;
  }

  // Serve JSON, but slowly
  if (req.method === "GET" && req.url === "/json") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    });
    res.flushHeaders();

    const filePath = path.join(__dirname, "data.json");
    const stream = fs.createReadStream(filePath, { encoding: "utf8" });

    stream.on("readable", function () {
      const interval = setInterval(() => {
        const chunk = stream.read(1);
        if (chunk !== null) {
          res.write(chunk);
        } else {
          clearInterval(interval);
          res.end();
        }
      }, 100); // Increase delay to 100ms for noticeable streaming
    });

    return;
  }

  // Return 404 for any other request
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
