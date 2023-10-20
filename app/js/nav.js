
$(document).ready(function() {

  $(".nav-button").click(function() {

    if ($(this).attr("state") !== "selected") {
      $(`.nav-button[state="selected"]`).removeAttr("state")
      $(this).attr("state", "selected")
      openPanel($(this).attr("toOpen"))
    }

  })

})

function openPanel(id) {

  $(`.main-panel[state="open"]`).removeAttr("state")
  $(`#${id}`).attr("state", "open")

}
