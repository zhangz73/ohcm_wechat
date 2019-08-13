// pages/index/login_downloaders.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    var expiration = timestamp + 60000 * 60 * 8;
    var data_expiration = wx.getStorageSync("data_expiration");
    if (data_expiration) {
      if (timestamp > data_expiration) {
        var upload_usr = wx.getStorageSync("upload_usr")
        var upload_pss = wx.getStorageSync("upload_pss")

        wx.clearStorageSync()
        wx.setStorageSync("data_expiration", expiration)
        wx.setStorageSync("upload_usr", upload_usr)
        wx.setStorageSync("upload_pss", upload_pss)
      }
    } else {
      wx.setStorageSync("data_expiration", expiration)
    }

    var util = require('../../utils/util.js')
    var username = wx.getStorageSync("download_usr");
    var password = wx.getStorageSync("download_pss");
    wx.request({
      url: 'https://students.washington.edu/zhangz73/proxy.php',
      data: util.json2Form({
        'user': username,
        'password': password,
        'target': 'https://students.washington.edu/zhangz73/nodejs_test/download.php'
      }),
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.cnt == 1) {
          wx.navigateTo({
            url: 'Downloading_page'
          })
        }
      }
    })
  },

  signup: function(){
    wx.navigateTo({
      url: 'signup_downloaders',
    })
  },

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
        'target': 'https://students.washington.edu/zhangz73/nodejs_test/download.php'
      }),
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.cnt == 1) {
          wx.setStorageSync("download_usr", username)
          wx.setStorageSync("download_pss", password)

          wx.navigateTo({
            url: 'Downloading_page'
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

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})