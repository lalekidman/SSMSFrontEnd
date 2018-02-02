import http from 'axios'
import DOMAIN from '../../configs/domain'

export const fetchBrandedSMS = (licenseId) => {
  return http({
    method: 'GET',
    url: `${DOMAIN}/api/brandedsms?licenseId=${licenseId}`,
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => {
    return res.data
  })
}

export const changeBrandedSMSStatus = (data) => {
  return http({
    method: 'PUT',
    url: `${DOMAIN}/api/brandedsms/changeStatus`,
    headers: {
      'Content-type': 'application/json'
    },
    data
  }).then(res => {
    return res.data
  })
}
