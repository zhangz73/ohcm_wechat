//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  //事件处理函数
  bindViewTap: function (e) {
    var that = this;
    var util = require('../../utils/util.js')
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    wx.request({
      url: 'https://students.washington.edu/zhangz73/proxy.php',
      data: util.json2Form({
        'user': username,
        'password': password,
        'target': 'https://students.washington.edu/zhangz73/nodejs_test/upload.php'
      }),
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.cnt == 1) {
          wx.setStorageSync("upload_usr", username)
          wx.setStorageSync("upload_pss", password)


          wx.navigateTo({
            //url: '../logs/logs'
            url: 'Uploading_page'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '用户名或密码错误',
          })
        }
      }
    })
  },
  onLoad: function () {
    var timestamp = Date.parse(new Date());
    var expiration = timestamp + 60000 * 60 * 1;
    var data_expiration = wx.getStorageSync("data_expiration");
    if (data_expiration) {
      if (timestamp > data_expiration) {
        var download_usr = wx.getStorageSync("download_usr")
        var download_pss = wx.getStorageSync("download_pss")

        wx.clearStorageSync()
        wx.setStorageSync("data_expiration", expiration)
        wx.setStorageSync("download_usr", download_usr)
        wx.setStorageSync("download_pss", download_pss)
      }
    } else {
      wx.setStorageSync("data_expiration", expiration)
    }

    var util = require('../../utils/util.js')
    var username = wx.getStorageSync("upload_usr");
    var password = wx.getStorageSync("upload_pss");

    wx.request({
      url: 'https://students.washington.edu/zhangz73/proxy.php',
      data: util.json2Form({
        'user': username,
        'password': password,
        'target': 'https://students.washington.edu/zhangz73/nodejs_test/upload.php'
      }),
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.cnt == 1) {
          wx.navigateTo({
            //url: '../logs/logs'
            url: 'Uploading_page'
          })
        }
      }
    })

  },
})
