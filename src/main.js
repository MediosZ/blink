// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, ipcMain, Tray} = require('electron')
const path = require('path')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let config = new Object()
config.interval = 5 * 1000 * 60
config.settingWin = undefined
config.aboutWin = undefined

ipcMain.on('setInterval', (event, arg) => {
  config.interval = parseFloat(arg.inter) * 1000 * 60
  //console.log("set interval: ",config.interval)
  if(config.settingWin){
    config.settingWin.close()
  }
  config.settingWin = undefined
  clearInterval(config.inter_id)
  config.inter_id = setInterval(() => {
    blink()
  }, config.interval)
})

ipcMain.on('closeAbout', (event, arg) => {
  if(config.aboutWin){
    config.aboutWin.close()
  }
  config.aboutWin = undefined
})


var trayMenuTemplate = [
  {
      label: 'Preference',
      click: function () {
        openSetting()
      }
  },
  {
      label: 'About',
      click: function () {
        openAbout()
      }
  },
  {
      label: 'Exit',
      click: function () {
        app.quit();
           app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      }
  }]

function openAbout(){
  aboutWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    },
    transparent: true,
    resizable: true,
    frame:false,
    backgroundColor: '#00000000'
  })
  config.aboutWin = aboutWindow
  aboutWindow.loadURL(`file://${__dirname}/about.html`)
  aboutWindow.setSkipTaskbar(false)
  aboutWindow.removeMenu()
  aboutWindow.setTitle("About")
  //aboutWindow.openDevTools()
  aboutWindow.show()
  aboutWindow.on('closed', function () {
    aboutWindow = null
  })
}


function openSetting(){
  //console.log("open setting")

  settingWindow = new BrowserWindow({
      width: 400,
      height: 300,
      webPreferences: {
        nodeIntegration: true
      },
      transparent: true,
      resizable: false,
      frame:false,
      backgroundColor: '#002e2c29'
    })
    settingWindow.loadURL(`file://${__dirname}/setting.html`)
    settingWindow.removeMenu()
    settingWindow.setTitle("Setting")
    config.settingWin = settingWindow
    settingWindow.show()
    //settingWindow.openDevTools()
    settingWindow.on('closed', function () {
      settingWindow = null
    })

}

function blink(){
  eyeWin = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    },
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    show:false,
  })

  setTimeout(() => {
    eyeWin.close()
  }, 2000)
  
  eyeWin.loadURL(`file://${__dirname}/index.html`)
  eyeWin.setIgnoreMouseEvents(true)
  eyeWin.setSkipTaskbar(true)
  //eyeWin.openDevTools()
  eyeWin.showInactive()

  eyeWin.on('closed', function () {
    eyeWin = null
  })
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 0,
    height: 0,
    webPreferences: {
      nodeIntegration: true
    },
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    show:false,
  })
  mainWindow.setSkipTaskbar(true)
  
  appTray = new Tray(path.join(__dirname,'..','build','app.ico'))
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
  appTray.setToolTip('blink')
  appTray.setContextMenu(contextMenu)
  blink()
  
  config.inter_id = setInterval(() => {
    blink()
  }, config.interval)

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
