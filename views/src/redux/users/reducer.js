import * as types from './constants'
const userListInitialState = {
  status: null,
  error: null,
  retry: null,
  data: []
}

export const userList = (state = userListInitialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.USER_LIST_PENDING:
      return {
        ...state,
        status: 'FETCHING'
      }
    case types.USER_LIST_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.USER_LIST_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    case types.USER_LIST_UPDATING:
      return {
        ...state,
        status: 'UPDATING'
      }
    case types.USER_LIST_UPDATED:
      return {
        ...state,
        status: 'UPDATED',
        data
      }
    default:
      return state
  }
}
const userAddInitialState = {
  status: null,
  error: null,
  retry: null,
  data: []
}
export const userAdd = (state = userAddInitialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.USER_ADD_PENDING:
      return {
        ...state,
        status: 'FETCHING'
      }
    case types.USER_ADD_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.USER_ADD_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}
const userUpdateInitialState = {
  status: null,
  error: null,
  retry: null,
  data: []
}
export const userUpdate = (state = userUpdateInitialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.USER_UPDATE_PENDING:
      return {
        ...state,
        status: 'FETCHING'
      }
    case types.USER_UPDATE_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.USER_UPDATE_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}

const userDeleteInitialState = {
  status: null,
  error: null,
  retry: null,
  data: []
}
export const userDelete = (state = userDeleteInitialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.USER_DELETE_PENDING:
      return {
        ...state,
        status: 'FETCHING'
      }
    case types.USER_DELETE_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.USER_DELETE_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}

const singleUserInitialState = {
  status: null,
  error: null,
  retry: null,
  data: {}
}
export const fetchSingleUser = (state = singleUserInitialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.FETCH_SINGLE_USER_PENDING:
      return {
        ...state,
        status: 'FETCHING'
      }
    case types.FETCH_SINGLE_USER_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.FETCH_SINGLE_USER_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}
const setActiveStatusInitialState = {
  status: null,
  error: null,
  retry: null,
  data: {}
}
export const setActiveStatus = (state = setActiveStatusInitialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.SET_USER_ACTIVE_STATUS_PENDING:
      return {
        ...state,
        status: 'FETCHING'
      }
    case types.SET_USER_ACTIVE_STATUS_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.SET_USER_ACTIVE_STATUS_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}

const fetchUserWithoutLicenseInitialState = {
  status: null,
  error: null,
  retry: null,
  data: {}
}
export const userWithoutLicense = (state = fetchUserWithoutLicenseInitialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.FETCH_USER_WITHOUT_LICENSE_PENDING:
      return {
        ...state,
        status: 'FETCHING'
      }
    case types.FETCH_USER_WITHOUT_LICENSE_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.FETCH_USER_WITHOUT_LICENSE_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}
