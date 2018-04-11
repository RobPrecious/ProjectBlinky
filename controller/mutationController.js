const path = require('path');
const fs = require('fs-extra');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

const mutator = require('./mutator');
const mutationLibrary = require('../mutantOperators/mutationLibrary')();
const validityController = require('../controller/validityController');


const mutationController = {
  mutantViabilityCheck: (location) => {
    return JSDOM.fromFile(path.resolve(__dirname, "../views/" + location))
      .then(dom => {
        return [mutationLibrary.filter(mutation => mutation.check(dom)), mutationLibrary.filter(mutation => !mutation.check(dom))];
      })
  },

  mutateSource: (source, mutationOperators, prefix) => {
    return new Promise((res, rej) => {
      source.mutants = [];
      mutationController.getMutations(source, mutationOperators)
        .then(mutations => {
          return mutator(source, mutations, prefix)
            .then(result => source.mutants = result);
        }).then((result) => {
          res(source);
        });
    });
  },

  getMutations: (source, availableMutants) => {
    return JSDOM.fromFile(source.file)
      .then(dom => {
        return availableMutants.filter(mutation => mutation.check(dom))
      })
      .catch(err => {
        console.log(err);
      })
  },

  getMutationPromises: (availableMutants) => {
    return mutationController.getSources().map((source, index) => {
      return new Promise((res, rej) => {
        let source_data = {
          id: source.id,
          file: source.file,
          route: source.route,
          mutants: []
        }
        mutationController.getMutations(source, availableMutants)
          .then(mutations => {
            return mutator(source, mutations)
              .then(result => source_data.mutants = result);
          }).then((result) => {
            res(source_data);
          });
      });
    });
  },

}

module.exports = mutationController;