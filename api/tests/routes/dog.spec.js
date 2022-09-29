/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, conn } = require('../../src/db.js');

const agent = session(app);
const breed = {
  name: 'Pug',
  height: '10 - 20',
  weight: '10 - 20',
  life_span: '10'
};

const temperament = {
  name: 'Electric'
};


////////////////////////////////////////////////////////


describe('Breed routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Breed.sync({ force: true })
    .then(() => Breed.create(breed)));

  describe('GET /dogs', () => {
    it('should response with 200', (done) => {
      agent.get('/dogs')
      .expect(200)
      .expect('Content-Type', /json/)
      done()
    });
  });

  describe('GET /dogs?name=something', () => {
    it('should can handle query params', (done) => {
      agent.get('/dogs?name=Akita')
      .expect(200)
      .expect('Content-Type', /json/)
      done()
    });
    it('should response with 404 if the breed is not found', (done) => {
      agent.get('/dogs?name=Dogui').expect(404)
      done()
    })
  });

  describe('GET /dogs/:id', () => {
    it('should can handle match params', (done) => {
      agent.get('/dogs/6')
      .expect(200)
      .expect('Content-Type', /json/)
      done()
    });
    it('should response with 404 if the breed is not found', (done) => {
      agent.get('/dogs/952354').expect(404)
      done()
    });
  });

  

  describe('Temperaments routes', () => {
    before(() => conn.authenticate()
      .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
    beforeEach(() => Breed.sync({ force: true })
    .then(() => Breed.create(breed)));

    describe('GET /temperaments', () => {
      it('should response with 200', (done) => {
        agent.get('/temperaments').expect(200)
        done()
      });
    });
  });
});

