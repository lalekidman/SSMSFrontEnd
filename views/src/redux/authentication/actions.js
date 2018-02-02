import * as types from './constants'

export const loginAdmin = (data) => {
  return {
    type: types.LOGIN_PENDING,
    data
  }
}
export const verifyAdmin = (data) => {
  return {
    type: types.VERIFY_ADMIN_PENDING
  }
}

export const logoutAdmin = (data) => {
  return {
    type: types.LOGOUT_USER,
    data
  }
}
