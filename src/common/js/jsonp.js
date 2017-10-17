/**
 * Created by fangzhen on 2017/10/16.
 */
import originJsonp from 'jsonp'
export default function jsonp(url, _params, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + params(_params)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function params(params) {
  let url = ''
  for (let key in params) {
    let tempValue = params[key] !== undefined ? params[key] : ''
    url += `&${key}=${encodeURIComponent(tempValue)}`
  }
  return url ? url.substring(1) : '' // 去掉param 最前面的&
}
