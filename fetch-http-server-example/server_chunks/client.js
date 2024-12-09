const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3005, // Ensure this matches the port your server is listening on
  path: '/json', // The path to your JSON endpoint
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);

  // Set encoding to 'utf8' to receive the data as strings
  res.setEncoding('utf8');

  // Event listener for receiving data chunks
  res.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
  });

  // Event listener for when the response has ended
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

// Event listener for request errors
req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

// End the request
req.end();
