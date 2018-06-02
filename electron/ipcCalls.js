const electron = require('electron');

const { ipcMain } = electron;

module.exports = {
  SetupIPCMain() {
    ipcMain.on('name', (event, arg) => {
      //Respond
    });
  }
}