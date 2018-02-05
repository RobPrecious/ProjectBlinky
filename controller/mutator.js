const pify = require('pify');
const fs = require('fs-extra');
const path = require('path');
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

              });
          });
      }));
    })
    .then(promises => Promise.all(promises))
    .catch(err => {
      console.log(err)
    })
};