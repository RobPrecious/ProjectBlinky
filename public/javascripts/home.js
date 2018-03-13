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



$(document).ready(function () {
  $('i[data-active]').on('click', function () {
    const active = $.parseJSON($(this).attr("data-active"));
    const col = $(this).attr("data-col-id");

    if (active) {
      $(this).attr("data-active", false);
      $(this).removeClass("fa-minus").addClass("fa-plus")

      $(this).parent().next().hide();

      $(".left-col").append($(this).parent().parent());

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
        console.log(i);
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
    switch (sourceChoice) {
      case 1:
        $.get("/testbench", function (data) {
          $("i[data-col-id=mutate-section]").click();
          $("#mutate-section").removeClass("disabled");

          //Fill data
          $("#mutant-count .card-body").html(data.mutations.viableCount + "/" + data.mutations.mutantCount);

          if (data.validity.valid) {
            $("#source-valid .card-body").html(" <i class='fas fa-check text-white'></i>");
          } else {
            $("#source-valid .card-body").html(" <i class='fas fa-times-circle text-white'></i>");
          }

          sourceURL = data.sourceURL;

          console.log(data);
        })
    }

  })

});