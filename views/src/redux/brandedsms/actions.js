import * as types from './constants'
export const fetchBrandedSMS = (licenseId) => ({
  type: types.FETCH_BRANDED_SMS_PENDING,
  licenseId
})
export const changeBrandedSMSStatus = (data) => ({
  type: types.BRANDED_SMS_CHANGE_STATUS_PENDING,
  data
})
