
$(document).ready(function() {

  $("#close-button").click(function() {
    window.api.headerFunctions("close")
  })

  $("#minimize-button").click(function() {
    window.api.headerFunctions("minimize")
  })

  $("#maximize-button").click(function() {
    window.api.headerFunctions("openDevTools")
  })

})
