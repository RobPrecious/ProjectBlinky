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

let sourceChoice = 1;
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
  $('i[data-active]').on('click', function () {
    const active = $.parseJSON($(this).attr("data-active"));
    const col = $(this).attr("data-col-id");

    if (active) {
      $(this).attr("data-active", false);
      $(this).removeClass("fa-minus").addClass("fa-plus")

      $(this).parent().next().hide();

      $(".left-col").append($(this).parent().parent());
      for (i = sections_indices[col] + 1; i < 4; i++) {
        if (!$("#" + section_list[i]).hasClass("disabled")) {

          $(".left-col").append($("#" + section_list[i]));
        }
      }

    } else {
      $("i[data-active]").attr("data-active", false);
      $("i[data-active]").parent().next().hide();

      $(this).attr("data-active", true);
      $(this).removeClass("fa-plus").addClass("fa-minus")
      $(this).parent().next().show();

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
      $(".active-col").append($(this).parent().parent());
    }

  })

  $('.source-choice').on('click', function () {
    $('.source-choice').removeClass("text-white").removeClass("bg-primary").addClass("bg-light");
    $(this).addClass("text-white").addClass("bg-primary").removeClass("bg-light");
  })


  $('#run-source').on('click', function () {
    $('<i id="loading-spinner" style="margin-left:10px" class="fas fa-spinner fa-spin text-primary"></i>').insertAfter($(this));
    switch (sourceChoice) {
      case 1:
        $.get("/testbench", function (data) {
          $("i[data-col-id=mutate-section]").click();
          $("#mutate-section").removeClass("disabled");
          $("#mutate-section > .section-content").removeClass("hide");


          //Fill data
          $("#mutant-count .card-body").html(data.mutations.viableCount + "/" + data.mutations.mutantCount);

          if (data.validity.valid) {
            $("#source-valid .card-body").html(" <i class='fas fa-check text-white'></i>");
          } else {
            $("#source-valid .card-body").html(" <i class='fas fa-times-circle text-white'></i>");
          }

          sourceURL = data.source.route;

          $("#loading-spinner").remove();
        })
    }

  })

  $('#btnViewSource').on('click', function () {
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
    $('<i id="loading-spinner" style="margin-left:10px" class="fas fa-spinner fa-spin text-info"></i>').insertAfter($(this));
    $.get("/mutate-source", function (data) {
      $("i[data-col-id=mutation-results-section]").click();
      $("#mutation-results-section").removeClass("disabled");
      $("#mutation-results-section > .section-content").removeClass("hide");

      $("#total-count .card-body").html(data.mutants.length);
      $("#valid-mutant-count .card-body").html(data.mutants.filter(mut => mut.validity.messages.length == 0).length + "/" + data.mutants.length);

      $("#loading-spinner").remove();

    })
  })

  $('#btnViewMutants').on('click', function () {
    var win = window.open("/view-mutants-summary", '_blank');
    win.focus();
  })

  $("#btnRunAxe").on('click', function () {
    $('<i id="loading-spinner" style="margin-left:10px" class="fas fa-spinner fa-spin text-warning"></i>').insertAfter($(this));
    $.get("/run-axe-agaist-axe", function (data) {
      $("i[data-col-id=axe-results-section]").click();
      $("#axe-results-section").removeClass("disabled");
      $("#axe-results-section > .section-content").removeClass("hide");

      console.log(data);
      $("#loading-spinner").remove();

      var categoriesbar = {
        type: 'bar',
        data: {
          labels: data.analysis.categories.map(cat => cat.name),
          datasets: [{
            label: "Live",
            backgroundColor: window.chartColors.green,
            data: data.analysis.categories.map(cat => cat.live)
          }, {
            label: "Dead",
            backgroundColor: window.chartColors.red,
            data: data.analysis.categories.map(cat => cat.killed)
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

      $("#total-violations .card-body").html(data.analysis.all.violations);
      $("#total-live .card-body").html(data.analysis.all.killed + "/" + data.analysis.all.violations);
      $("#kill-score .card-body").html((data.analysis.all.killed / data.analysis.all.violations * 100) + "%");


    })
  })

});