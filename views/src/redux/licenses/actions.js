import * as types from './constants'

export const fetchLicense = () => {
  return {
    type: types.LICENSE_LISTS_FETCHING
  }
}

export const addLicense = (data) => {
  return {
    type: types.LICENSE_ADD_PENDING,
    data
  }
}

export const editLicense = (data) => {
  return {
    type: types.LICENSE_EDIT_PENDING,
    data
  }
}

export const deleteLicense = (id) => {
  return {
    type: types.LICENSE_DELETE_PENDING,
    id
  }
}

export const fetchLicenseById = (id) => {
  return {
    type: types.LICENSE_FINDONE_PENDING,
    id
  }
}

export const fetchLicenseMembers = (id) => {
  return {
    type: types.LICENSE_MEMBERS_LISTS_PENDING,
    id
  }
}

export const saveLicenseMembers = (data) => {
  return {
    type: types.LICENSE_MEMBERS_SAVE_PENDING,
    data
  }
}
