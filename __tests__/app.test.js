const request = require('supertest');
const app = require('../lib/app');
const fakeRequest = require('supertest');
const parseRequest = require('../lib/utils/parseRequest.js');

describe('app routes', () => {
  it('should return hi for GET request on / path', async () => {
    const response = await fakeRequest(app).get('/');
    const expected = 'hi';

    expect(response.text).toEqual(expected);
  });

  it('should return content type text/plain for GET request on / path', async () => {
    const response = await fakeRequest(app).get('/');
    const expected = 'text/plain';

    const contentType = response.header['content-type'];

    expect(contentType).toEqual(expected);
  });

  it('should return whatever is in the body of the request for POST on /echo path', async () => {
    const response = await fakeRequest(app).post('/echo').send('echoECHOecho');

    const expected = 'echoECHOecho';

    expect(response.text).toEqual(expected);
  });

  it('should return content type text/plain for POST on /echo path', async () => {
    const response = await fakeRequest(app).post('/echo').send('echoECHOecho');

    const expected = 'text/plain';

    const contentType = response.header['content-type'];

    expect(contentType).toEqual(expected);
  });

  it('should return status 200 for POST on /echo path', async () => {
    const response = await fakeRequest(app).post('/echo').send('echoECHOecho');
    const expected = 200;

    const status = response.statusCode;

    expect(status).toEqual(expected);
  });

  it('should return <h1>red</h1> for GET on /red path', async () => {
    const response = await fakeRequest(app).get('/red');
    const expected = '<h1>red</h1>';

    expect(response.text).toEqual(expected);
  });

  it('should return <h1>blue</h1> for GET on /blue path', async () => {
    const response = await fakeRequest(app).get('/blue');
    const expected = '<h1>blue</h1>';

    expect(response.text).toEqual(expected);
  });

  it('should return <h1>green</h1> for GET on /green path', async () => {
    const response = await fakeRequest(app).get('/green');
    const expected = '<h1>green</h1>';

    expect(response.text).toEqual(expected);
  });

  it('should return content type text/html for GET on /red, /green, or /blue path', async () => {
    const response = await fakeRequest(app).get('/red');

    const expected = 'text/html';

    const contentType = response.header['content-type'];

    expect(contentType).toEqual(expected);
  });

  it('should return a Not Found html page for any bad request', async () => {
    const response = await fakeRequest(app).get('/bad');
    const expected = `<!DOCTYPE html>
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
</html>`;

    expect(response.text).toEqual(expected);
  });

  it('should return a Not Found html page for any bad request', async () => {
    const response = await fakeRequest(app).post('/bad').send('garbage');
    const expected = `<!DOCTYPE html>
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
</html>`;

    expect(response.text).toEqual(expected);
  });

  it('should return status 404 for any bad request', async () => {
    const response = await fakeRequest(app).get('/bad');
    const expected = 404;

    const status = response.statusCode;

    expect(status).toEqual(expected);
  });
});
