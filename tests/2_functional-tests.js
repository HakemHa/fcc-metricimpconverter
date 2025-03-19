const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);
    suite('test', () => {
        test('Convert a valid input such as 10L', (done) => {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert?input=10L')
                .end((err, res) => {
                    let ans = '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}';
                    assert.equal(ans , res.text);
                    done();
                });
        });
        test('Convert an invalid input such as 32g', (done) => {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert?input=32g')
                .end((err, res) => {
                    let ans = "invalid unit";
                    assert.equal(ans , res.text);
                    done();
                });
        });
        test('Convert an invalid number such as 3/7.2/4kg', (done) => {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert?input=3/7.2/4kg')
                .end((err, res) => {
                    let ans = "invalid number";
                    assert.equal(ans , res.text);
                    done();
                });
        });
        test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', (done) => {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert?input=3/7.2/4kilomegagram')
                .end((err, res) => {
                    let ans = "invalid number and unit";
                    assert.equal(ans , res.text);
                    done();
                });
        });
        test('Convert with no number such as kg', (done) => {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert?input=kg')
                .end((err, res) => {
                    let ans = '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}';
                    assert.equal(ans , res.text);
                    done();
                });
        });
    });
});
