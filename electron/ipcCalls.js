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
    ipcMain.on('read-line-items', (event) => {
      event.returnValue = FileUtils.ReadLineItems();
    });
    ipcMain.on('save-line-items', (event, items) => {
      FileUtils.SaveLineItems(items);
    });
  }
};