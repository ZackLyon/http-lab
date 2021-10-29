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
});
