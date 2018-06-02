const electron = require('electron');

const { BrowserWindow } = electron;

const MAIN_PATH = "build/main.html";

class MainWindow extends BrowserWindow {
  constructor() {
    super({
      width: 1200,
      height: 800,
      webPreferences: { backgroundThrottling: false }
    });
    this.loadURL(`file://${__dirname}/../${MAIN_PATH}`);
  }
}

module.exports = MainWindow;