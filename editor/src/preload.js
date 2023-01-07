const {
    contextBridge,
    ipcRenderer
} = require('electron');

contextBridge.exposeInMainWorld(
    'api', {
        send: (channel, data) => {
            let validChannels = ['toMain'];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, listenerFunction) => {
            let validChannels = ['fromMainNewFile'];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => listenerFunction(...args));
            }
        }
    }
);