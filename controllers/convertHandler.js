function ConvertHandler() {
  const imperialUnits = ['gal', 'mi', 'lbs'];
  const metricUnits = ['L', 'km', 'kg'];
  this.getNum = function(input) {
    for (unit in imperialUnits+metricUnits) {
      let index = input.indexOf(unit);
      if (index !== -1) {
        return parseFloat(input.substring(0, index));
      }
    } 
    return 1;
  };
  
  this.getUnit = function(input) {
    for (unit in imperialUnits+metricUnits) {
      let index = input.indexOf(unit);
      if (index !== -1) {
        return input.substring(index, input.length);
      }
    } 
    return null;
  };
  
  this.getReturnUnit = function(initUnit) {
    let index = imperialUnits.indexOf(initUnit);
    if (index !== -1) {
      return metricUnits[index];
    }
    else {
      index = metricUnits.indexOf(initUnit);
      return imperialUnits[metricUnits.indexOf(initUnit)];
    }
  };

  this.spellOutUnit = function(unit) {
    const spelledImperial = ['gallons', 'miles', 'pounds'];
    const spelledMetric = ['liters', 'kilometers', 'kilograms'];
    let index = imperialUnits.indexOf(initUnit);
    if (index !== -1) {
      return spelledImperial[index];
    }
    else {
      let index = metricUnits.indexOf(initUnit);
      return spelledMetric[index];
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const miToKm = 1.60934;
    const lbsToKg = 0.453592;
    const conversions = [galToL, miToKm, lbsToKg];
    let index = imperialUnits.indexOf(initUnit);
    if (index !== -1) {
      return initNum * conversions[index];
    }
    else {
      let index = metricUnits.indexOf(initUnit);
      return initNum / conversions[index];
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
