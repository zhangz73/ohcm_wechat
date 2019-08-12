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
      url: 'https://students.washington.edu/zhangz73/nodejs_test/download.php',
      data: util.json2Form({
        'user': username,
        'password': password
      }),
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.cnt == 1) {
          wx.setStorageSync("download_usr", username)
          wx.navigateTo({
            url: 'Downloading_page'
          })
        } else {
          wx.showToast({
            title: '用户名或密码错误',
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