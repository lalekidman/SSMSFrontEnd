import * as types from './constants'
export const fetchBrandedSMS = (licenseId) => ({
  type: types.FETCH_BRANDED_SMS_PENDING,
  licenseId
})
export const changeBrandedSMSStatus = (data) => ({
  type: types.BRANDED_SMS_CHANGE_STATUS_PENDING,
  data
})
export const fetchBrandedSMSById = (data) => ({
  type: types.FETCH_BRANDED_SMS_BY_ID_PENDING,
  data
})
export const addCredits = (data) => ({
  type: types.ADD_CREDIT_BRANDED_SMS_PENDING,
  data
})

export const editCredit = (data) => ({
  type: types.EDIT_CREDIT_BRANDED_SMS_PENDING,
  data
})

export const deleteCredit = (data) => ({
  type: types.DELETE_CREDIT_BRANDED_SMS_PENDING,
  data
})

export const setCredits = (lists) => ({
  type: types.SET_BRANDED_SMS_CREDIT_BY_ID,
  creditList: lists
})
