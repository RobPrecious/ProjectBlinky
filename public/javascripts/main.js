const sections_indices = {
  "source-section": 0,
  "mutate-section": 1,
  "mutation-results-section": 2,
  "axe-results-section": 3
}
const section_list = [
  "source-section",
  "mutate-section",
  "mutation-results-section",
  "axe-results-section",
]

let sourceChoice = "1";
let sourceURL = null;

window.chartColors = {
  red: 'rgb(220,53,69)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};


$(document).ready(function () {
  // ----------------------- NAVIGATION -------------------------- //
  $('.section-title').on('click', function () {
    let control = $(this).children("i").first();

    const active = $.parseJSON($(control).attr("data-active"));
    const col = $(control).attr("data-col-id");

    if (active) {
      $(control).attr("data-active", false);
      $(control).removeClass("fa-minus").addClass("fa-plus")

      $(this).next().hide();

      $(".left-col").append($(this).parent());
      for (i = sections_indices[col] + 1; i < 4; i++) {
        if (!$("#" + section_list[i]).hasClass("disabled")) {

          $(".left-col").append($("#" + section_list[i]));
        }
      }

    } else {
      $("i[data-active]").attr("data-active", false);
      $("i[data-active]").parent().next().hide();

      $(control).attr("data-active", true);
      $(control).removeClass("fa-plus").addClass("fa-minus")
      $(this).next().show();

      //left
      for (i = sections_indices[col] - 1; i > -1; i--) {
        $(".left-col").prepend($("#" + section_list[i]));
        $("i[data-col-id=" + section_list[i] + "]").removeClass("fa-minus").addClass("fa-plus");
      }

      //right
      for (i = sections_indices[col] + 1; i < 4; i++) {
        $(".right-col").append($("#" + section_list[i]));
        $("i[data-col-id=" + section_list[i] + "]").removeClass("fa-minus").addClass("fa-plus");

      }
      $(".active-col").append($(this).parent());
    }
  })

  // ----------------------- STAGE 1 (SOURCE) -------------------------- //

  $('.source-choice').on('click', function () {
    $('.source-choice').removeClass("text-white").removeClass("bg-primary").addClass("bg-light");
    $(this).addClass("text-white").addClass("bg-primary").removeClass("bg-light");
    sourceChoice = $(this).attr('data-source-choice');

  })

  $('#run-source').on('click', function () {
    $('<span id="loading-spinner"> <i class="fas fa-spinner fa-spin text-primary"></i></span>').insertAfter($(this));
    switch (sourceChoice) {
      case "1":
        {
          console.log("hit")
          $.get("/testbench", function (data) {
            $("#loading-spinner").remove();
            openStage2(data);
          })
          break;
        }
      case "4":
        {
          $.get("/analyse-saved", function (data) {
            $("#loading-spinner").remove();
            openStage2(data.source);
            openStage3(data.source);
            openStage4(data);
          })
          break;
        }
      case "5":
        {
          $.get("/get-session", function (data) {
            $("#loading-spinner").remove();
            console.log(data);
            if (data.stage == 2) {
              openStage2(data.source);
            }
            if (data.stage == 3) {
              openStage2(data.source);
              openStage3(data.source);
            }
            if (data.stage == 4) {
              openStage2(data.source);
              openStage3(data.source);
              openStage4(data);
            }
          })
          break;
        }
      default:
        break;
    }
  })

  // ----------------------- STAGE 2 (ANALYSIS) -------------------------- //

  function openStage2(source) {
    console.log(source);
    $("i[data-col-id=mutate-section]").click();
    $("#mutate-section").removeClass("disabled");
    $("#mutate-section > .section-content").removeClass("hide");

    $("#mutant-count .card-body").html(source.mutations.viableCount + "/" + source.mutations.mutantCount);
    $("#axe-violation-count .card-body").html(source.ATTResults.axe.violationsCount);


    if (source.validity.valid) {
      $("#source-valid .card-body").html(" <i class='fas fa-check text-white'></i>");
    } else {
      $("#source-valid .card-body").html("<span style='font-size: 14pt' ><i class='fas fa-times-circle text-white' style='margin: 15px 0px -15px 0px;display: block;'></i>" + (!source.validity.valid ? source.validity.validityCheckResult.messages.length : 0) + " errors found </span>");
    }

    sourceURL = source.route;
  }

  $('.btnViewSource').on('click', function () {
    var win = window.open(sourceURL, '_blank');
    win.focus();
  })

  $('#btnMutationSummary').on('click', function () {
    var win = window.open("/view-mutation-summary", '_blank');
    win.focus();
  })

  $('#btnViolationSummary').on('click', function () {
    var win = window.open("/view-violation-summary", '_blank');
    win.focus();
  })

  $('#btnValidationSummary').on('click', function () {
    var win = window.open("/view-validation-summary", '_blank');
    win.focus();
  })

  $("#btnRunMutations").on('click', function () {
    $('<span id="loading-spinner"> <i class="fas fa-spinner fa-spin text-info"></i></span>').insertAfter($(this));
    $.get("/mutate-source", function (data) {
      openStage3(data);
      $("#loading-spinner").remove();

    })
  })

  // ----------------------- STAGE 3 (MUTATION RESULTS) -------------------------- //

  function openStage3(data) {
    console.log("STAGE 3", data);

    $("i[data-col-id=mutation-results-section]").click();
    $("#mutation-results-section").removeClass("disabled");
    $("#mutation-results-section > .section-content").removeClass("hide");

    $("#total-count .card-body").html(data.mutants.length);
    $("#valid-mutant-count .card-body").html(data.mutants.filter(mut => mut.validity.valid).length + "/" + data.mutants.length);
  }



  $('#btnViewMutants').on('click', function () {
    var win = window.open("/view-mutants-summary", '_blank');
    win.focus();
  })
  $('#btnViewSource').on('click', function () {
    console.log("source button pressed")
    var win = window.open("/v2/source", '_blank');
    win.focus();
  })


  $("#btnRunAxe").on('click', function () {
    $('<span id="loading-spinner"> <i class="fas fa-spinner fa-spin text-warning"></i></span>').insertAfter($(this));
    $(this).attr('disabled', true);
    $.get("/run-att", function (data) {
      if (data == "Axe is already running.") {
        console.log(data);
        $('<p class="text-warning">Axe test is already running</p>').insertAfter($("#btnRunAxe"));
        $("#loading-spinner").remove();
      } else {
        openStage4(data);
      }
    })
  });

  // ----------------------- STAGE 4 (AXE RESULTS) -------------------------- //

  function openStage4(data) {
    console.log(data);
    $("i[data-col-id=axe-results-section]").click();
    $("#axe-results-section").removeClass("disabled");
    $("#axe-results-section > .section-content").removeClass("hide");
    $("#btnRunAxe").attr('disabled', false);
    $("#loading-spinner").remove();

    var categoriesbar = {
      type: 'bar',
      data: {
        labels: data.analysis.categories.map(cat => cat.name),
        datasets: [{
          label: "Live",
          backgroundColor: window.chartColors.green,
          data: data.analysis.categories.map(cat => cat.axe.live)
        }, {
          label: "Dead",
          backgroundColor: window.chartColors.red,
          data: data.analysis.categories.map(cat => cat.axe.killed)
        }]
      },
      options: {
        legend: {
          display: true
        },
        title: {
          display: true,
          text: 'Live/Dead by Mutation Class'
        }
      }
    };

    var categorieschart = document.getElementById('categories-area').getContext('2d');
    window.categories = new Chart(categorieschart, categoriesbar);

    $("#axe-total-violations .card-body").html(data.analysis.all.axe.violations);
    $("#axe-total-live .card-body").html(data.analysis.all.axe.killed + "/" + data.analysis.all.axe.total);
    $("#axe-kill-score .card-body").html((data.analysis.all.axe.killed / data.analysis.all.axe.total * 100).toFixed(0) + "%");
  }

  $('#btnExportCSV').on('click', function () {
    window.location = "/export-csv";
  })

});