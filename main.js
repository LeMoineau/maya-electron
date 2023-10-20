
const path = require("path")
const {
  app,
  BrowserWindow,
  ipcMain
 } = require("electron")

function createWindow() {

  const win = new BrowserWindow({
    center: true,
    title: "coucou",
    show: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "app/js/preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  })

  win.loadFile("./app/index.html")

  win.on('ready-to-show', function() {
    win.removeMenu()
    win.maximize()
    win.show()
    win.webContents.openDevTools()
  })

  ipcMain.on("close", function() {
    win.close()
  })

  ipcMain.on("minimize", function() {
    win.minimize()
    //win.webContents.send("fromMain", responseObj);
  })

  ipcMain.on("openDevTools", function() {
    win.webContents.openDevTools()
  })

}

app.whenReady().then(() => {
  createWindow()
})

app.on("window-all-closed", function() {
  if (process.platform !== 'darwin') app.quit()
})
