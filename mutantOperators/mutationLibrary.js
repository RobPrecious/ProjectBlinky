const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

const changeAttribute = require('./changeAttribute');
const changeElement = require('./changeElement');
const other = require('./other');
const H = require('./H-Techniques')


module.exports = () => {
  const operators = [
    ...H,
    //...changeAttribute,
    //...changeElement,
    //...other,
  ];
  return operators.sort((a, b) => b.id.localeCompare(a.id));

};