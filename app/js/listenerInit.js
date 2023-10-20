
$(document).ready(function() {

  replaceToImport()

})

function toggleStateButton(selector) {

  let self = $(`${selector}[state="show"]`)
  $(`${selector}[state="hide"]`).attr("state", "show")
  self.attr("state", "hide")

}
