// pages/list/list.js
const fetch=require("../../utils/fetch")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:{},
    shops:[],
    pageIndex:0,
    pageOptions:15,
    choose:true
  },

  //封装加载下一页数据
  loadMore(){
    if(!this.data.choose) return
    let {pageIndex,pageOptions} = this.data
    const pageInfo = { _page: ++pageIndex, _limit: pageOptions}
    return fetch(`categories/${this.data.category.id}/shops`, pageInfo)
      .then(res => {
        const totalCount=parseInt(res.header['X-Total-Count'])
        const shops=this.data.shops.concat(res.data)
        const choose=pageIndex*pageOptions<totalCount
        this.setData({ shops,pageIndex,choose })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`categories/${options.cat}`).then(res=>{
      this.setData({category:res.data})
      wx.setNavigationBarTitle({
        title: res.data.name
      })
      //加载完分类信息过后再去加载商铺信息
      this.loadMore()
    })
 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.category.name){
      wx.setNavigationBarTitle({
        title: this.data.category.name
      })
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({pageIndex:0,shops:[],choose:true})
    this.loadMore().then(() => { wx.stopPullDownRefresh()})
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})