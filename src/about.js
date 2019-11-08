const {ipcRenderer} = require('electron')

var closeAbout = function(interval){
    ipcRenderer.send('closeAbout', "close")
}

document.getElementById('btn').addEventListener('click', () => {
    closeAbout()
})