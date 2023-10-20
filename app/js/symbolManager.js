
const organisation = {
  gallery: "gallery",
  solo: "solo"
}

const direction = {
  left: "gauche",
  right: "droite"
}

class SymbolManager {

  constructor(idPanel, callback) {

    this.symbols = []
    this.html = {
      parentPanel: $(`#${idPanel}`),
      topToolbar: null,
      symbolsContainer: null,
      toLeftDirectionButton: null,
      toRightDirectionButton: null,
      addSymbolDirectionButton: null
    }
    this.currentCol = 5
    this.organisation = organisation.gallery
    this.selectedSymbol = {
      symbol: null,
      index: -1
    }

    this._init(callback)
  }

  _init(callback) {

    insertHTMLTemplate(this.html.parentPanel, "./HTMLtemplate/symbolManager.html", () => {
      let idSymbolsContainer = `${this.html.parentPanel.attr("id")}-symbols-container`
      this.html.parentPanel.children(".symbols-container").attr("id", idSymbolsContainer)

      this.html = {
        parentPanel: this.html.parentPanel,
        topToolbar: this.html.parentPanel.children(".top-toolbar"),
        symbolsContainer: $(`#${idSymbolsContainer}`),
        toLeftDirectionButton: $(`#${idSymbolsContainer}`).children(".to-left-direction-button"),
        toRightDirectionButton: $(`#${idSymbolsContainer}`).children(".to-right-direction-button"),
        addSymbolDirectionButton: $(`#${idSymbolsContainer}`).children(".add-symbol-direction-button")
      }

      this.organisation = organisation[this.html.symbolsContainer.attr("organisation")]

      this.html.toLeftDirectionButton.click(() => {
        this.changeSelectedSymbol(direction.left)
      })

      this.html.toRightDirectionButton.click(() => {
        this.changeSelectedSymbol(direction.right)
      })

      this.html.addSymbolDirectionButton.click(() => {
        this.addNewSymbol()
      })

      this.html.topToolbar.children(".toggle-symbol-points").click(() => {
        toggleStateButton(".toggle-symbol-points")
        symManager.toggleSymbolPoint()
      })

      this.html.topToolbar.children(".toggle-symbols-organisation").click(() => {
        toggleStateButton(".toggle-symbols-organisation")
        symManager.changeSymbolsOrganisation()
      })

      callback()
    })

  }

  addNewSymbol() {
    let newone = new Symbol(this.currentCol, this, () => {
      this.symbols.push(newone)
      this.setSymbolSelected(newone)
    })
  }

  toggleSymbolPoint() {
    for (let sym of this.symbols) {
      sym.toggleSymbolPoint()
    }
  }

  changeSymbolsOrganisation() {
    if (this.organisation === organisation.gallery) {
      this.organisation = organisation.solo
    } else {
      this.organisation = organisation.gallery
    }
    this.html.symbolsContainer.attr("organisation", this.organisation)
    this.updateContainerView()
  }

  setSymbolSelected(symbol) {
    if (this.selectedSymbol.symbol !== null) {
      this.selectedSymbol.symbol.setSelected(false)
    }
    this.selectedSymbol.symbol = symbol
    this.selectedSymbol.index = this.symbols.findIndex(s => s === this.selectedSymbol.symbol)
    symbol.setSelected(true)
    this.updateContainerView()
  }

  updateContainerView() {
    this._updateContainerOrganisation()
    this._updateDirectionButton()
  }

  _updateContainerOrganisation() {
    if (this.organisation === organisation.solo) {
      let parentRect = this.html.parentPanel[0].getBoundingClientRect()
      let symbolRect = this.selectedSymbol.symbol.html.div[0].getBoundingClientRect()
      let x_wanted = parentRect.left + parentRect.width / 2 - symbolRect.width / 2
      let marginRight = (symbolRect.left - x_wanted) * 2
      this.html.symbolsContainer.css("margin-right", `calc(${this.html.symbolsContainer.css("margin-right")} + ${marginRight}px)`)
    } else if (this.organisation === organisation.gallery) {
      this.html.symbolsContainer.css("margin-right", "0px")
    }
  }

  _updateDirectionButton() {
    if (this.organisation === organisation.solo) {
      if (this.selectedSymbol.index === 0) {
        this.html.toLeftDirectionButton.attr("state", "disabled")
      } else {
        this.html.toLeftDirectionButton.removeAttr("state")
      }

      if (this.selectedSymbol.index === this.symbols.length - 1) {
        this.html.toRightDirectionButton.attr("state", "hide")
        this.html.addSymbolDirectionButton.removeAttr("state")
      } else {
        this.html.toRightDirectionButton.removeAttr("state")
        this.html.addSymbolDirectionButton.attr("state", "hide")
      }
    } else if (this.organisation === organisation.gallery) {
      this.html.addSymbolDirectionButton.removeAttr("state")
    }
  }

  changeSelectedSymbol(dir) {
    if (dir === direction.left) {
      if (this.selectedSymbol.index !== 0) {
        this.setSymbolSelected(this.symbols[this.selectedSymbol.index - 1])
      }
    } else if (dir === direction.right) {
      if (this.selectedSymbol.index !== this.symbols.length - 1) {
        this.setSymbolSelected(this.symbols[this.selectedSymbol.index + 1])
      }
    }
  }

}
