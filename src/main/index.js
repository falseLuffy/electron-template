'use strict'

import { app, BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// 托盘对象
var appTray = null
let trayIcon = null

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 1080,
    width: 1920,
    useContentSize: true,
    resizable: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  let trayMenuTemplate = [
    {
      label: '设置',
      click: function () {} // 打开相应页面
    },
    {
      label: '意见反馈',
      click: function () {}
    },
    {
      label: '帮助',
      click: function () {}
    },
    {
      label: '关于demo',
      click: function () {}
    },
    {
      label: '退出demo',
      click: function () {
        // ipc.send('close-main-window');
        app.quit()
        appTray.destroy()
        // mainWindow = null
      }
    }
  ]

  // 系统托盘图标目录
  trayIcon = path.join(__dirname, '../../build/icons')

  appTray = new Tray(path.join(trayIcon, 'icon.ico'))

  // 图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)

  // 设置此托盘图标的悬停提示内容
  appTray.setToolTip('This is my application.')

  // 设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu)

  appTray.setToolTip('My托盘测试')
  appTray.setContextMenu(contextMenu)
  appTray.on('double-click', () => { // 我们这里模拟桌面程序点击通知区图标实现打开关闭应用的功能
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true)
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('close', (event) => {
    debugger
    console.log(event)
    mainWindow.hide()
    mainWindow.setSkipTaskbar(true)
    event.preventDefault()
  })

  mainWindow.on('show', () => {
    appTray.setHighlightMode('always')
  })
  mainWindow.on('hide', () => {
    appTray.setHighlightMode('never')
  })
}

app.commandLine.appendSwitch('ignore-certificate-errors')

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
