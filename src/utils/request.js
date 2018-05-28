import {
  baseUrl
} from './env'
import {
  sign
} from './md5'

const service = function(config) {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().getTime()
    const data = {
      sign: sign(config.data, timestamp),
      timestamp: timestamp,
      jsonString: config.data ? JSON.stringify(config.data) : null
    }
    wx.request({
      url: baseUrl + config.url,
      data,
      method: config.method,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 'application/json'
      },
      success: res => {
        const data = res.data
        if (data.code === '0') {
          return resolve(data || {})
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none'
          })
          return reject(data || {})
        }
        // if (config.showError) {
        //   console.log('123')
        //   if (res.statusCode < 200 || res.statusCode > 300) {
        //     return reject(res.data || {})
        //   }

        //   if (Number(res.data.status) !== 0) {
        //     return reject(res.data || {})
        //   }
        // }

        // return resolve(res.data || {})
      },
      complete: res => {
        // TODO:
      }
    })
  })
}

export default service
