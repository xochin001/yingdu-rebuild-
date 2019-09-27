
//-------------------------------------------------------------------------原始的写法

//临时用
const host = 'http://www.jingsoftware.com:4430';
export {
  host
}
//请求封装
function request(url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' //数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url, 
      method: method,
      data: data,
      header: {
        'content-type': 'application/json' ,// 默认值
      },
      success: function (res) {
        wx.hideLoading();
        resolve(res.data)
      },
      fail: function (error) {
        wx.hideLoading();
        reject(false)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  })
}
















export function get(url,data){
	return request(url ,'GET', data)
}
export function post(url, data) {
  return request(url, 'POST', data)
}
// 

//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------


export function toLogin() {
  const userInfo = wx.getStorageSync('userInfo');
  if (!userInfo) {
    wx.navigateTo({
      url: "/pages/login/main"
    });
  } else {
    return true;
  }
}

export function login() {
  const userInfo = wx.getStorageSync('userInfo');
  if (userInfo) {
    return userInfo;
  }
}

export function memberlogin() {
	const memberInfo = wx.getStorageSync('memberInfo')
	if(memberInfo) {
		return memberInfo
	}
}

//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------


export function getStorageOpenid() {
  const openId = wx.getStorageSync("openId");
  if (openId) {
    return openId;
  } else {
    return ''
  }
}


export default {
}