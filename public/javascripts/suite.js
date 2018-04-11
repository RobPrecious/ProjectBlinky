window.chartColors = {
  red: 'rgb(220,53,69)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};


const liveCard = ` <div class="card bg-success text-white mb-3 stat-card-small">` +
  `<div class="card-header">Live</div>` +
  `<div class="card-body"><i class="fas fa-check text-white "></i></div>` +
  `</div>`;

const killedCard = `<div class="card bg-danger text-white mb-3 stat-card-small">` +
  `<div class="card-header">Killed</div>` +
  `<div class="card-body"><i class="fas fa-times-circle text-white " style='margin: 15px 0px -15px 0px;display: block;'></i></div>` +
  `</div >`

const livePill = `<span class="badge badge-pill badge-success">LIVE</span>`;

const violationCard = (num) => {
  return (`<div class="card bg-dark text-white mb-3 stat-card-small">` +
    `<div class="card-header"># Violations</div>` +
    `<div class="card-body">` + num + `</div>` +
    `</div>`);
}

const loadingSpinner = `<span id="loading-spinner"> <i class="fas fa-spinner fa-spin text-primary"></i></span>`

$(document).ready(function () {
  if ($('#loading-spinner[data-find-me]')) {
    getData();
  }

  $('.btnRunAxe').on('click', function () {
    console.log("Running axe ...");
    const mutant_id = $(this).attr("data-mutant");
    $(".live-or-dead-card-container[data-mutant='" + mutant_id + "']").html(loadingSpinner);
    $.post("/mut-op/test-mutant-operation", {
      mutant_id
    }, function (data) {
      const current = data.find(mut => mut.id == mutant_id);
      let html = violationCard(current.analysis.axe.violations) + (current.analysis.axe.live ? liveCard : killedCard);
      html += `<a href="/mut-op/mutants/TestBench-m` + mutant_id + `" target="_blank">View Mutant </a>`;
      $(".live-or-dead-card-container[data-mutant='" + mutant_id + "']").html(html);
      $(".not-run-pill[data-mutant='" + mutant_id + "']").remove();
      if (current.analysis.axe.live) {
        $(".mutop-pill-section[data-mutant='" + mutant_id + "']").html(livePill);
      }
      $("#loading-spinner").remove();
      console.log("...Complete")
    })
  })

  function getData() {
    $.get("/mut-op/get-saved-analysis", function (data) {
      /* createBarChart("classes",
         "classes-bar-chart",
         data.analysis.classes.map(cat => cat.name), [{
           label: "Live",
           backgroundColor: window.chartColors.green,
           data: data.analysis.classes.map(cat => cat.axe.live)
         }, {
           label: "Dead",
           backgroundColor: window.chartColors.red,
           data: data.analysis.classes.map(cat => cat.axe.killed)
         }],
         "Live/Dead by Mutation Class");*/

      createBarChart("subclasses",
        "sub-classes-bar-chart",
        data.analysis.subClasses.map(cat => cat.name), [{
          label: "Live",
          backgroundColor: window.chartColors.green,
          data: data.analysis.subClasses.map(cat => cat.axe.live)
        }, {
          label: "Dead",
          backgroundColor: window.chartColors.red,
          data: data.analysis.subClasses.map(cat => cat.axe.killed)
        }],
        "Live/Dead by Mutation SubClass");

      $("#loading-spinner").remove();


    });
  }

  function createBarChart(name, dom_location, labels, datasets, title) {
    var barchart_data = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        legend: {
          display: true
        },
        title: {
          display: true,
          text: title
        }
      }
    };

    var barChart = document.getElementById(dom_location).getContext('2d');
    window["bar-" + name] = new Chart(barChart, barchart_data);
  }

});