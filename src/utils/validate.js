/**
 * Created by jiachenpan on 16/11/18.
 */

// 手机号
export function validatPhoneNumber(str) {
  const reg = /^[1][3,5,7,8][0-9]{9}$/
  return reg.test(str)
}
