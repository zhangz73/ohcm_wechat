// pages/index/Uploading_page.js
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
    this.setData({
      "username": wx.getStorageSync("upload_usr")
    })
  },

  goBack: function(){
    wx.navigateTo({
      url: 'index',
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  choose: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: res.tempFilePaths,
          imageUrl: res.tempFilePaths
        })
        console.log(res.tempFilePaths)

        wx.setStorage({ key: "qr_code", data: tempFilePaths[0] })
      }
    })
  },

  submit2server: function(e) {
    var that = this;
    var util = require('../../utils/util.js')
    var course = e.detail.value.course;
    console.log(course)
    var qr_code = wx.getStorageSync('qr_code')
    wx.uploadFile({
      url: 'https://students.washington.edu/zhangz73/nodejs_test/add.php',
      filePath: qr_code,
      name: 'qr_code',
      formData: {
        'course': course,
        "username": this.data.username
      },
      success: function(res) {
        console.log(res)
        wx.reLaunch({
          url: 'Uploading_page'
        })
        wx.showToast({
          title: '二维码已成功提交'
        })
      }
    })
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