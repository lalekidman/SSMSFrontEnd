import * as types from './constants'
let initialState = {
  status: null,
  data: {},
  error: null,
  retry: 0
}
export default (state = initialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.LOGIN_PENDING:
      return {
        ...state,
        status: 'AUTHENTICATING',
        error: null,
        data: {},
        retry: (state.retry + 1)
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        status: 'AUTHENTICATED',
        error: null,
        data
      }
    case types.VERIFY_ADMIN_PENDING:
      return {
        ...state,
        status: 'VERIFYING'
      }
    case types.VERIFY_ADMIN_SUCCESS:
      return {
        ...state,
        status: 'VERIFIED',
        data
      }
    case types.VERIFY_ADMIN_FAILED:
      return {
        ...state,
        status: 'VERIFY_FAILED',
        data: {},
        error
      }
    case types.LOGIN_FAILED:
      return {
        ...state,
        status: 'FAILED',
        data: {},
        error
      }
    case types.LOGOUT_USER:
      return initialState
    default:
      return state
  }
}
