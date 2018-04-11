const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

const changeAttribute = require('./changeAttribute');
const changeElement = require('./changeElement');
const other = require('./other');


module.exports = () => {
  const operators = [
    ...changeAttribute,
    ...changeElement,
    ...other,
  ];
  return operators.sort( (a, b) => a.id.localeCompare(b.id));

};