const net = require('net');
const parseRequest = require('./utils/parseRequest');
const createResponse = require('./utils/createResponse');

const app = net.createServer((socket) => {
  socket.on('data', (data) => {
    const request = parseRequest(data.toString());

    const { method, path } = request;

    if (method === 'GET' && path === '/') {
      socket.write(
        createResponse({
          body: 'hi',
          status: '200 OK',
          contentType: 'text/plain',
        })
      );
    } else if (method === 'POST' && path === '/echo') {
      const { body } = request;
      socket.write(
        createResponse({
          body: body,
          status: '200 OK',
          contentType: 'text/plain',
        })
      );
    } else if (
      method === 'GET' &&
      (path === '/red' || path === '/blue' || path === '/green')
    ) {
      socket.write(
        createResponse({
          body: `<h1>${path.slice(1)}</h1>`,
          status: '200 OK',
          contentType: 'text/html',
        })
      );
    } else {
      socket.end(
        createResponse({
          body: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>404 page</title>
</head>
<body>
<h1>Not Found</h1>
</body>
</html>`,
          status: '404 Not Found',
          contentType: 'text/html',
        })
      );
    }
  });
});

module.exports = app;
