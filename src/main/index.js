/*
 * @Author: jwchan1996
 * @Date: 2019-07-25 14:45:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-12 11:41:50
 */
import { app, BrowserWindow } from 'electron'
import express from 'express'

//引入自动判断端口可用函数
import portIsOccupied from '../../lib/utils/portIsOccupied'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

//打包后的文件默认是以 "file://" 协议加载的
//因为 flash 不允许在 "file://" 协议下加载，为了解决 flash 加载的安全问题
//使用 express 用作本地服务器，使得页面运行在本地 http 端口服务
function localServer() {
  // 使用 promise 配合 await 实现同步
  return new Promise((resolve, reject) => {
    let server = express()
    server.use(express.static(__dirname));
    portIsOccupied(9080).then(port => {
      server.listen(port)
      resolve(port)
    })
  }) 
}

let mainWindow

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

async function createWindow () {

  if (process.env.NODE_ENV === "production") {
    // 使用 async / await 实现同步等待，保证 process.env.PROD_PORT 的赋值
    await localServer()
  }

  const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${process.env.DEV_PORT}`
  // : `file://${__dirname}/index.html`
  // 解决 flash 不允许在 "file://" 协议下加载的问题
  : `http://localhost:${process.env.PROD_PORT}/index.html`

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
