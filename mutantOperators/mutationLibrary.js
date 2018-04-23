const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

const H = require('./H-Techniques')
const ARIA = require('./ARIA-Techniques')


module.exports = () => {
  const operators = [
    ...H,
    ...ARIA
  ];
  return operators.sort((a, b) => a.id.localeCompare(b.id));

};