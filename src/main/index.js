/*
 * @Author: jwchan1996
 * @Date: 2019-07-25 14:45:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-12 11:41:50
 */
import { app, BrowserWindow } from 'electron'
import express from 'express'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

//解决flash本地file不安全问题
function localServer() {
  let server = express();
  server.use(express.static(__dirname));
  server.listen(9080);
}

if (process.env.NODE_ENV === "production") {
  localServer();
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  // : `file://${__dirname}/index.html`
  //解决flash在file下不安全的问题
  : `http://localhost:9080/index.html`

// app.commandLine.appendSwitch('ppapi-flash-path', app.getPath('pepperFlashSystemPlugin'));
let flashPlugins = process.arch == 'x64' 
  ? require('path').resolve(__dirname, '../../lib/pepflashplayer64_29_0_0_238.dll')
  : require('path').resolve(__dirname, '../../lib/pepflashplayer32_29_0_0_238.dll')

if (__dirname.includes(".asar")) {
  flashPlugins = process.arch == 'x64' 
    ? require('path').join(process.resourcesPath + '/lib/pepflashplayer64_29_0_0_238.dll')
    : require('path').join(process.resourcesPath + '/lib/pepflashplayer32_29_0_0_238.dll')
}
app.commandLine.appendSwitch('ppapi-flash-path', flashPlugins);
app.commandLine.appendSwitch('ppapi-flash-version', '29.0.0.238');

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 900,
    width: 1600,
    useContentSize: true,
    frame: false,
    center: true,
    fullscreenable: false, // 是否允许全屏
    center: true, // 是否出现在屏幕居中的位置
    title: 'electron-rtmp',
    backgroundColor: '#fff', // 背景色，用于transparent和frameless窗口
    titleBarStyle: 'hidden', // 标题栏的样式，有hidden、hiddenInset、customButtonsOnHover等
    resizable: false, // 是否允许拉伸大小
    'webPreferences': {
      plugins: true,
      webSecurity: false,
      defaultFontFamily: {
        standard: "Microsoft YaHei",
        defaultEncoding: "utf-8"
      }
    }
  })

  if (process.env.NODE_ENV == 'development') {
    mainWindow.webContents.openDevTools()
  }
  
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
