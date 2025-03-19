const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('#getNum', () => {
        test('should correctly read a whole number input', () => {
            assert.equal(3, convertHandler.getNum('3kg'));
        });
        test('should correctly read a decimal number input', () => {
            assert.equal(3.3, convertHandler.getNum('3.3kg'));
        });
        test('should correctly read a fractional input', () => {
            assert.equal(0.5, convertHandler.getNum('1/2kg'));
        });
        test('should correctly read a fractional input with a decimal', () => {
            assert.equal(0.7, convertHandler.getNum('3.5/5kg'));
        });
        test('should correctly return an error on a double-fraction', () => {
            assert.throws(() => {convertHandler.getNum('1/2/3kg')}, Error);
        });
        test('should correctly return an error on a double-period', () => {
            assert.throws(() => {convertHandler.getNum('1.2.3kg')}, SyntaxError);
        });
        test('should correctly default to a numerical input of 1 when no numerical input is provided', () => {
            assert.equal(1, convertHandler.getNum('kg'));
        });
    });
    suite('#getUnit', () => {
        test('should correctly read each valid input unit', () => {
            assert.strictEqual("gal", convertHandler.getUnit('4gal'));
            assert.strictEqual("mi", convertHandler.getUnit('4mi'));
            assert.strictEqual("lbs", convertHandler.getUnit('4lbs'));
            assert.strictEqual("L", convertHandler.getUnit('4L'));
            assert.strictEqual("km", convertHandler.getUnit('4km'));
            assert.strictEqual("kg", convertHandler.getUnit('4kg'));
        });
        test('should correctly return an error for an invalid input unit', () => {
            assert.throws(() => {convertHandler.getUnit('4gala')}, Error);
        });
    });
    suite("#getReturnUnit", () => {
        test('should return the correct return unit for each valid input unit', () => {
            assert.strictEqual('L', convertHandler.getReturnUnit('gal'));
            assert.strictEqual('km', convertHandler.getReturnUnit('mi'));
            assert.strictEqual('kg', convertHandler.getReturnUnit('lbs'));
            assert.strictEqual('gal', convertHandler.getReturnUnit('L'));
            assert.strictEqual('mi', convertHandler.getReturnUnit('km'));
            assert.strictEqual('lbs', convertHandler.getReturnUnit('kg'));
        });
    });
    suite('#spellOutUnit', () => {
        test('should correctly return the spelled-out string unit for each valid input unit', () => {
            assert.strictEqual('gallons', convertHandler.spellOutUnit('gal'));
            assert.strictEqual('miles', convertHandler.spellOutUnit('mi'));
            assert.strictEqual('pounds', convertHandler.spellOutUnit('lbs'));
            assert.strictEqual('liters', convertHandler.spellOutUnit('L'));
            assert.strictEqual('kilometers', convertHandler.spellOutUnit('km'));
            assert.strictEqual('kilograms', convertHandler.spellOutUnit('kg'));
        });
    });
    suite('#convert', () => {
        test('should correctly convert gal to L', () => {
            assert.approximately(3.78541, convertHandler.convert(1, 'gal'), 0.01);
            assert.approximately(0, convertHandler.convert(0, 'gal'), 0.01);
            assert.approximately(11.3562, convertHandler.convert(3, 'gal'), 0.01);
            assert.approximately(5.67812, convertHandler.convert(1.5, 'gal'), 0.01);
        });
        test('should correctly convert L to gal', () => {
            assert.approximately(0.264172, convertHandler.convert(1, 'L'), 0.01);
            assert.approximately(0, convertHandler.convert(0, 'L'), 0.01);
            assert.approximately(0.792516, convertHandler.convert(3, 'L'), 0.01);
            assert.approximately(0.396258, convertHandler.convert(1.5, 'L'), 0.01);
        });
        test('should correctly convert mi to km', () => {
            assert.approximately(1.60934, convertHandler.convert(1, 'mi'), 0.01);
            assert.approximately(0, convertHandler.convert(0, 'mi'), 0.01);
            assert.approximately(4.82803, convertHandler.convert(3, 'mi'), 0.01);
            assert.approximately(2.41402, convertHandler.convert(1.5, 'mi'), 0.01);
        });
        test('should correctly convert km to mi', () => {
            assert.approximately(0.621371, convertHandler.convert(1, 'km'), 0.01);
            assert.approximately(0, convertHandler.convert(0, 'km'), 0.01);
            assert.approximately(1.86411, convertHandler.convert(3, 'km'), 0.01);
            assert.approximately(0.932057, convertHandler.convert(1.5, 'km'), 0.01);
        });
        test('should correctly convert lbs to kg', () => {
            assert.approximately(0.453592, convertHandler.convert(1, 'lbs'), 0.01);
            assert.approximately(0, convertHandler.convert(0, 'lbs'), 0.01);
            assert.approximately(1.36078, convertHandler.convert(3, 'lbs'), 0.01);
            assert.approximately(0.680389, convertHandler.convert(1.5, 'lbs'), 0.01);
        });
        test('should correctly convert kg to lbs', () => {
            assert.approximately(2.20462, convertHandler.convert(1, 'kg'), 0.01);
            assert.approximately(0, convertHandler.convert(0, 'kg'), 0.01);
            assert.approximately(6.61387, convertHandler.convert(3, 'kg'), 0.01);
            assert.approximately(3.30693, convertHandler.convert(1.5, 'kg'), 0.01);
        });
    });
});