// pages/index/signup_downloaders.js
Page({

  /**
   * Page initial data
   */
  data: {
    email: '',
    password:'',
    password2:'',
    code: '',
    true_code: ''
  },

  getUsername: function(e){
    this.setData({
      email: e.detail.value
    })
  },

  getPassword: function(e){
    this.setData({
      password: e.detail.value
    })
  },

  getPassword2: function (e) {
    this.setData({
      password2: e.detail.value
    })
  },

  getCode: function(e){
    this.setData({
      code: e.detail.value
    })
  },

  bindViewTap: function (e) {
    var that = this;
    var util = require('../../utils/util.js')
    var email = this.data.email;
    var password = this.data.password;
    var password2 = this.data.password2;
    if(password !== password2){
      wx.showToast({
        title: '两次输入的密码不一致',
      })
    } else if(this.data.code === '' || parseInt(this.data.code) !== parseInt(this.data.true_code)){
      wx.showToast({
        title: '验证码错误',
      })
    } else{
      wx.request({
        url: 'https://students.washington.edu/zhangz73/nodejs_test/signup.php',
        data: util.json2Form({
          'email': email,
          'password': password
        }),
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.navigateTo({
            url: 'login_downloaders',
          })

          wx.showToast({
            title: '已成功注册账号',
          })
        }
      })
    }
  },

  sendEmail: function(){
    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var num = getRndInteger(100000, 999999);
    this.setData({
      true_code: num
    })
    var util = require('../../utils/util.js')

    wx.request({
      url: 'https://students.washington.edu/zhangz73/nodejs_test/sendEmail.php',
      data: util.json2Form({
        'user': this.data.email,
        'code': num
      }),
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res){
        wx.showToast({
          title: '邮件已发送',
        })
      }
    })

  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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