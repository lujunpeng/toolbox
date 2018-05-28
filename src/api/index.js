import request from '@/utils/request'

// 查询快递轨迹
export function kdniaoSubscribe(data) {
  return request({
    url: '/smallProgram/kdniaoSubscribeAPI1002',
    method: 'post',
    data: data
  })
}

// 查询所有快递公司
export function findExpressAll() {
  return request({
    url: '/smallProgram/findExpressAll',
    method: 'post'
  })
}

// 查询快递公司详情
export function findExpressByExpressCode(expressCode) {
  return request({
    url: '/smallProgram/findExpressByExpressCode',
    method: 'post',
    data: {
      expressCode
    }
  })
}
