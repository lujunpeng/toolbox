/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = ''
let routerMode = 'hash'
let imgBaseUrl

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://api.cwcicmj.com'
  imgBaseUrl = 'https://api.cwcicmj.com'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://api.cwcicmj.com'
  imgBaseUrl = 'https://api.cwcicmj.com'
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl
}
