const {ipcRenderer} = require('electron')

var applySetting = function(interval){
    ipcRenderer.send('setInterval', {
        inter: interval
    })
    
}

document.getElementById('btn').addEventListener('click', () => {
    let inter = document.getElementById('interval').value
    applySetting(inter)
})