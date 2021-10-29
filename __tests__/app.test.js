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

    // const parsedRequest = parseRequest(response);
    const contentType = response.header['content-type'];

    expect(contentType).toEqual(expected);
  });
});
