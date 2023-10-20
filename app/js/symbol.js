
class Symbol {

  constructor(col, parentManager, callback) {
    this.col = col
    this.parentManager = parentManager
    this.symbolPointHided = false
    this.html = {
      container: parentManager.html.symbolsContainer,
      div: $(`<div class="symbol" col="${this.col}"> </div>`),
      drawerDiv: null,
      bottContainerDiv: null
    }
    this.bott = {
      left: false,
      center: false,
      right: false
    }
    this.lines = []
    this.selected = false

    this._init(callback)
  }

  _init(callback) {

    insertHTMLTemplate(this.html.div, "./HTMLtemplate/symbol.html", () => {

      //Ajout du corps html du symbol
      this.html.container.append(this.html.div)
      this.html.drawerDiv = this.html.div.children(".symbol-drawer")
      this.html.bottContainerDiv = this.html.div.children(".symbol-bott-container")

      //Ajout des points dans le drawer du symbol
      for (let i = 0; i<=this.col; i++) {
        for (let j = 0; j<=this.col; j++) {
          let point = $(`<div class="symbol-drawer-point"> </div>`)
            .css("left", `${100 * i/this.col}%`)
            .css("top", `${100 * j/this.col}%`)
          this.html.drawerDiv.append(point)
        }
      }

      //Ajout des event pour le symbol (bott & point)
      this.html.bottContainerDiv.children(".symbol-bott").click(() => {
        if ($(this).attr("state") !== "selected") {
          $(this).attr("state", "selected")
        } else {
          $(this).removeAttr("state")
        }
        this.bott[$(this).attr("bott-position")] = ($(this).attr("state") === "selected")
      })

      this.html.div.click(() => {
        this.parentManager.setSymbolSelected(this)
      })

      callback()
    })

  }

  toggleSymbolPoint() {
    let symbolPointHided = this.symbolPointHided
    this.html.drawerDiv.children(".symbol-drawer-point").each(function() {
      if (symbolPointHided) {
        $(this).removeAttr("state")
      } else {
        $(this).attr("state", "hide")
      }
    })
    this.symbolPointHided = !this.symbolPointHided
  }

  setSelected(selected) {
    if (selected) {
      this.html.div.attr("state", "selected")
    } else {
      this.html.div.removeAttr("state")
    }
    this.selected = selected
  }

}
