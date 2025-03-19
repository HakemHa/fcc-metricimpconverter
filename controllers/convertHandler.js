function ConvertHandler() {
  const imperialUnits = ['gal', 'mi', 'lbs'];
  const metricUnits = ['l', 'km', 'kg'];
  this.getNum = function(input) {
    input = input.toLowerCase();
    let index = 0;
    let fractions = 0;
    while (index < input.length) {
      if ((input[index].charCodeAt(0) >= 48 && input[index].charCodeAt(0) <= 57) || ['.', '/'].includes(input[index])) {
        index += 1;
        if (input[index] == '/') {fractions++};
      }
      else {
        break;
      }
    }
    if (fractions > 1) {throw new Error('Invalid Number')};
    if (index > 0) {
      return eval(input.substring(0, index));
    }
    else {
      return 1;
    }
  };
  
  this.getUnit = function(input) {
    input = input.toLowerCase();
    let index = 0;
    while (index < input.length) {
      if ((input[index].charCodeAt(0) >= 48 && input[index].charCodeAt(0) <= 57) || ['.', '/'].includes(input[index])) {
        index += 1;
      }
      else {
        break;
      }
    }
    let unitTest = input.substring(index, input.length);
    if (imperialUnits.concat(metricUnits).includes(unitTest)) {
      if (unitTest == 'l') {return 'L'};
      return unitTest;
    }
    else {
      throw new Error("Invalid Unit");
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    initUnit = initUnit.toLowerCase();
    let index = imperialUnits.indexOf(initUnit);
    if (index !== -1) {
      if (metricUnits[index] == 'l') {return 'L'};
      return metricUnits[index];
    }
    else {
      index = metricUnits.indexOf(initUnit);
      return imperialUnits[metricUnits.indexOf(initUnit)];
    }
  };

  this.spellOutUnit = function(unit) {
    unit = unit.toLowerCase();
    const spelledImperial = ['gallons', 'miles', 'pounds'];
    const spelledMetric = ['liters', 'kilometers', 'kilograms'];
    let index = imperialUnits.indexOf(unit);
    if (index !== -1) {
      return spelledImperial[index];
    }
    else {
      let index = metricUnits.indexOf(unit);
      return spelledMetric[index];
    }
  };
  
  this.convert = function(initNum, initUnit) {
    initUnit = initUnit.toLowerCase();
    const galToL = 3.78541;
    const miToKm = 1.60934;
    const lbsToKg = 0.453592;
    const conversions = [galToL, miToKm, lbsToKg];
    let index = imperialUnits.indexOf(initUnit);
    if (index !== -1) {
      return parseFloat((initNum * conversions[index]).toFixed(5));
    }
    else {
      let index = metricUnits.indexOf(initUnit);
      return parseFloat((initNum / conversions[index]).toFixed(5));
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
