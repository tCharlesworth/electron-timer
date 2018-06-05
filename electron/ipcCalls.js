const electron = require('electron');
const FileUtils = require('./fileUtils');

const { ipcMain } = electron;

module.exports = {
  SetupIPCMain() {
    ipcMain.on('save-timers', (event, timers) => {
      FileUtils.SaveTimers(timers);
    });
    ipcMain.on('read-timers', (event) => {
      event.returnValue = FileUtils.ReadTimers();
    });
  }
};