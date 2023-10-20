
const {
    contextBridge,
    ipcRenderer
} = require("electron");

const fs = require("fs")

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        headerFunctions: (action) => {
          actionPermitted = ["close", "minimize", "openDevTools"]
          if (actionPermitted.includes(action)) {
            ipcRenderer.send(action);
          }
        },
        getLocalFileContent: (url, callback, ...params) => {
          fs.readFile(`./app/${url}`, "utf-8", function(err, data) {
            if (err) {
              console.log(err)
            }
            callback(data, ...params)
          })
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);
