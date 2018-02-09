import http from 'axios'
import DOMAIN from '../../configs/domain'
export const fetchLicense = () => {
  return http({
    url: `${DOMAIN}/api/license`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.data
  })
}

export const addLicense = (data) => {
  return http({
    url: `${DOMAIN}/api/license`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }).then(res => {
    return res.data
  })
}

export const editLicense = (data) => {
  return http({
    url: `${DOMAIN}/api/license`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }).then(res => {
    return res.data
  })
}
export const deleteLicense = (id) => {
  return http({
    url: `${DOMAIN}/api/license`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      id
    }
  }).then(res => {
    return res.data
  })
}
export const fetchLicenseById = (id) => {
  return http({
    url: `${DOMAIN}/api/license/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.data
  })
}

export const fetchLicenseMembersById = (id) => {
  return http({
    url: `${DOMAIN}/api/license/${id}/members`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.data
  })
}

export const saveLicenseMembersById = ({id, members}) => {
  return http({
    url: `${DOMAIN}/api/license/${id}/members`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      members
    }
  }).then(res => {
    return res.data
  })
}
