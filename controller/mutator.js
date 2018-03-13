const pify = require('pify');
const fs = require('fs-extra');
const path = require('path');
const validator = require('html-validator');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

module.exports = (source, mutations) => {
  return new Promise((resolve, reject) => {
      resolve(mutations.map((mutation, index) => {
        return JSDOM.fromFile(path.resolve(__dirname, source.file))
          .then(dom => {
            let sourceHTML = dom.serialize();

            return pify(fs).writeFile(path.resolve(__dirname, '../views/mutants/' + source.id + '-m' + mutation.id + '.html'), mutation.mutation(dom))
              .then(data => {
                return {
                  id: source.id + '-m' + mutation.id,
                  file: path.resolve(__dirname, '../views/mutants/' + source.id + '-m' + mutation.id + '.html'),
                  route: '/mutants/' + source.id + '-m' + mutation.id,
                  mutation: mutation,
                  thisHTML: dom.serialize(),
                  sourceHTML,
                };

              })
              .then(data => {
                return validityCheck(dom)
                  .then(validityResult => {
                    data.validity = validityResult;
                    return data;
                  })
              });
          });
      }));
    })
    .then(promises => Promise.all(promises))
    .catch(err => {
      console.log(err)
    })
};

function validityCheck(dom) {
  return validator({
      format: 'json',
      data: dom.serialize(),
    })
    .then((data) => {
      return data;
    })
}