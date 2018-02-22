const path = require('path');
const fs = require('fs-extra');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

const mutator = require('./mutator');

const mutationController = {
  getSources: () => {
    const files = fs.readdirSync(path.resolve(__dirname, '../views/sources'));
    let output = [];
    for (let i in files) {
      output.push({
        id: files[i].split('.')[0],
        route: 'sources/' + files[i].split('.')[0],
        file: path.resolve(__dirname, '../views/sources/' + files[i])
      })
    }

    return output;
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

  analyse: (data, categories) => {
    let all = {
      total: 0,
      violations: 0,
      live: 0,
      killed: 0,
    };
    data.mutations.map(mut => {
      all.violations += mut.violations;
      all.live += mut.live;
      all.killed += mut.violations - mut.live;

      let mut_class = categories.find(cat => cat.name == mut.class);
      mut_class.violations += mut.violations;
      mut_class.live += mut.live;
      mut_class.killed += mut.violations - mut.live > 0 ? mut.violations - mut.live : 0;
      mut_class.total++;
    })

    return {
      all,
      categories,
    };
  }

}


module.exports = mutationController;