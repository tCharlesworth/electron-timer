import { ipcRenderer } from 'electron';

function SaveTimers (timers) {
    ipcRenderer.send('save-timers', timers);
}

function ReadTimers () {
    return ipcRenderer.sendSync('read-timers');
}

function ReadLineItems() {
    return ipcRenderer.sendSync('read-line-items');
}

function SaveLineItems(items) {
    ipcRenderer.send('save-line-items', items);
}

export {
    SaveTimers,
    ReadTimers,
    ReadLineItems,
    SaveLineItems
};