const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
let translator = new Translator();

suite('Functional Tests', () => {
  test('valid request', function (done) {
    const text = 'Mangoes are my favorite fruit.';
    const translation = `Mangoes are my ${translator.highlight('favourite')} fruit.`
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({
        text: text,
        locale: 'american-to-british'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.text, text);
        assert.equal(res.body.translation, translation);
        done();
      });
  });

  test('invalid locale', function (done) {
    const text = 'Mangoes are my favorite fruit.';

    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({
        text: text,
        locale: 'american-to-german'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Invalid value for locale field');
        done();
      });
  });

  test('missing text', function (done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({
        locale: 'american-to-british'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  test('missing locale', function (done) {
    const text = 'Mangoes are my favorite fruit.';

    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({
        text: text
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  test('empty text', function (done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({
        text: '',
        locale: 'american-to-british'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'No text to translate');
        done();
      });
  });

  test('no translation required', function (done) {
    const text = 'Mangoes are my favourite fruit.';

    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({
        text: text,
        locale: 'american-to-british'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.translation, 'Everything looks good to me!');
        done();
      });
  });
});
