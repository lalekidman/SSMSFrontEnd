import http from 'axios'
import DOMAIN from '../../configs/domain'
export const fetchUser = () => {
  return http({
    method: 'GET',
    url: `${DOMAIN}/api/users`
  }).then(res => {
    return res.data
  })
}

export const addUser = (data) => {
  return http({
    method: 'POST',
    url: `${DOMAIN}/api/users`,
    data
  }).then(res => {
    return res.data
  })
}
export const updateUser = (data) => {
  return http({
    method: 'PUT',
    url: `${DOMAIN}/api/users`,
    headers: {
      'Content-type': 'application/json'
    },
    data
  }).then(res => {
    return res.data
  })
}
export const deleteUser = (data) => {
  return http({
    method: 'DELETE',
    url: `${DOMAIN}/api/users`,
    headers: {
      'Content-type': 'application/json'
    },
    data
  }).then(res => {
    return res.data
  })
}
export const setUserActiveStatus = (data) => {
  return http({
    method: 'PUT',
    url: `${DOMAIN}/api/users/set-active-status`,
    headers: {
      'Content-type': 'application/json'
    },
    data
  }).then(res => {
    return res.data
  })
}

export const fetchSingleUser = ({accountId, licenseId}) => {
  return http({
    method: 'GET',
    url: `${DOMAIN}/api/users/${accountId}?licenseId=${licenseId}`
  }).then(res => {
    return res.data
  })
}
