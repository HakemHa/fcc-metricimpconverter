'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    let initNum;
    try {
      initNum = convertHandler.getNum(input);
    } catch(e) {
      try {
        convertHandler.getUnit(input);
      } catch(e2) {
        res.send('invalid number and unit');
      }
      res.send('invalid number');
    }
    let initUnit;
    try {
      initUnit = convertHandler.getUnit(input);
    } catch(e) {
      res.send('invalid unit');
    }
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.json({
      'initNum': initNum, 
      'initUnit': initUnit, 
      'returnNum': returnNum,
      'returnUnit': returnUnit,
      'string': string
    })
  });
};
