var request = require('supertest')
var request = request("http://localhost:5000/api/v1")

describe('Explorations', () => {
  describe('GET', () => {
    it('This test expect 404 status code cause must be present headers on request', done => {
      request.get('/explorations/?page=0&limit=10')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });
});

describe('Explorations association', () => {
  describe('GET', () => {
    it('Should return json with explorations and bookings', done => {
      request.get('/explorations/booking/12345a')
        .expect(404, done);
    });
  });
});


describe('Bookings', () => {
  describe('GET', () => {
    it('Should return json with bookings', done => {
      request.get('/bookings/?page=0&limit=10')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});