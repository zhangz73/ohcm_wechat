//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  upload: function(){
    wx.navigateTo({
      url: 'login',
    })
  },
  download: function(){
    wx.navigateTo({
      url: 'login_downloaders',
    })
  },
  
  bindViewTap: function(e) {
    //
    //wx.getUserInfo({
      //success: function(res) {
        //console.log(res.userInfo)
      //}
    //})
    //
    var that = this;
    var util = require('../../utils/util.js')
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    wx.request({
      url: 'https://students.washington.edu/zhangz73/nodejs_test/upload.php',
      data: util.json2Form({
        'user': username,
        'password': password
      }),
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        console.log(res.data.cnt)
        if(res.data.cnt == 1){
          wx.navigateTo({
            //url: '../logs/logs'
            url: 'Uploading_page'
          })
        } else {
          wx.showToast({
            title: '用户名或密码错误',
          })
        }
      }
    })
    /*
    if(admins.includes(username) && password === "uwcm20151001"){
      wx.navigateTo({
        //url: '../logs/logs'
        url: 'Uploading_page'
      })
    } else {
      wx.showToast({
        title: '用户名或密码错误',
      })
    }*/
  },
  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
