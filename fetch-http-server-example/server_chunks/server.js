const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (_, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
        return;
    }

    if (req.method === 'GET' && req.url === '/json') {
        res.writeHead(200, {
            "Content-Type": "text/plain", // Use text/plain to prevent buffering
            "Transfer-Encoding": "chunked",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        });
        res.flushHeaders();

        const filePath = path.join(__dirname, "data.json");
        const stream = fs.createReadStream(filePath, { encoding: "utf8" });

        // Set the highWaterMark to 1 byte to force smaller chunks
        stream._readableState.highWaterMark = 1;

        // Array to store chunks
        let chunks = [];

        // Collect all chunks
        stream.on('data', (chunk) => {
            chunks.push(chunk);
        });

        stream.on('end', () => {
            // Function to send chunks with a delay
            let index = 0;

            const sendChunk = () => {
                if (index < chunks.length) {
                    const chunk = chunks[index];
                    res.write(chunk);
                    console.log('Sending chunk:', chunk);
                    index++;
                    setTimeout(sendChunk, 500); // Adjust delay (500ms) as needed
                } else {
                    res.end();
                }
            };

            sendChunk(); // Start sending chunks
        });

        return;
    }
});

server.listen(3005, () => {
    console.log('Server is listening on port 3005');
});
