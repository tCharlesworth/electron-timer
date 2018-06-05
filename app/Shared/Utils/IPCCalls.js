import { ipcRenderer } from 'electron';

function SaveTimers (timers) {
    ipcRenderer.send('save-timers', timers);
}

function ReadTimers () {
    return ipcRenderer.sendSync('read-timers');
}

export {
    SaveTimers,
    ReadTimers
};