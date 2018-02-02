import DOMAIN from '../../configs/domain'
import http from 'axios'
export const loginAdmin = (data) => {
  return http({
    method: 'POST',
    url: `${DOMAIN}/api/admin/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    data
  }).then(res => {
    console.log('FUCK DATA: ', res)
    console.log('FUCK cookie: ', res.headers["set-cookie"])
    return res.data
  })
}
export const verifyAdmin = (data) => {
  console.log('FUCK COOKLIELZ: ', document.cookie)
  return http({
    method: 'GET',
    url: `${DOMAIN}/api/admin/verify`,
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => {
    return res.data
  })
  // return fetch({
  //   method: 'GET',
  //   url: `${DOMAIN}/api/admin/verify`,
  //   headers: {
  //     'Content-type': 'application/json',
  //     'X-Requested-With': 'XMLHttpRequest'
  //   }
  // }).then(res => {
  //   return res.data
  // })
}
