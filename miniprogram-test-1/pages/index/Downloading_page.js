// pages/index/Downloading_page.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  preview: function(e){
    wx.previewImage({
      urls: [this.data.imageURL],
      current: this.data.imageURL
    })
  },

  submit2server: function(e){
    var util = require('../../utils/util.js')
    var course = e.detail.value.course;
    var that = this
    wx.request({
      url: 'https://students.washington.edu/zhangz73/nodejs_test/download_logs.php',
      data: util.json2Form({
        'course': course,
        'username': this.data.username
      }),
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.course)
        if(res.data.course.includes("none")){
        wx.showToast({
          title: '未找到二维码',
        })
      }
        wx.downloadFile({
          url: 'https://students.washington.edu/zhangz73/nodejs_test/qr_code/' + res.data.course,
          success: function(response){
            var tempFilePath = response.tempFilePath
            that.setData({
              imageURL: tempFilePath
            })
          }
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      "username": wx.getStorageSync("download_usr")
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