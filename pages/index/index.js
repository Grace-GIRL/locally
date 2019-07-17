//index.js
//获取应用实例
const app = getApp()

const fetch=require('../../utils/fetch')

Page({
  data: {
    slides:[],
    categories: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    // wx.request({
    //   url:'https://locally.uieee.com/slides',
    //   success:res=>{
    //     this.setData({slides:res.data})
    //   }
    // })
    // wx.request({
    //   url: 'https://locally.uieee.com/categories',
    //   success: res => {
    //     this.setData({ categories: res.data })
    //   }
    // })
    fetch('slides').then(res=>{
      this.setData({slides:res.data})
    })
    fetch('categories').then(res => {
      this.setData({ categories: res.data })
    })






    
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
