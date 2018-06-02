const electron = require('electron');


const { app } = electron;

let mainWindow;

function LaunchApplication() {
  // Should launch setup with the main window?
  CreateMainWindow();
}

app.on('ready', LaunchApplication);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if(mainWindow === null) {
    CreateMainWindow();
  }
});

function CreateMainWindow() {
  // Create the window
  mainWindow = new MainWindow();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}