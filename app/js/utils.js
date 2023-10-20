
function getAllAttributes(ele) {
  let attrs = {}
  for (let a of ele.attributes) {
    attrs[a.name] = a.nodeValue
  }
  return attrs
}

function replaceToImport() {
  $("to-import").each(function() {
    let self = $(this)
    let attrs = getAllAttributes($(this)[0])
    window.api.getLocalFileContent(self.attr("url"), (data) => {
      newself = $(data)
      for (let a in attrs) {
        newself.attr(a, attrs[a])
      }
      self.replaceWith(newself)
    })
  })
}

function insertHTMLTemplate(parent, url, callback) {

  window.api.getLocalFileContent(url, function(template) {
    parent.append(template)
    replaceToImport()
    callback()
  })

}
