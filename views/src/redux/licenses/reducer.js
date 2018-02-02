import * as types from './constants'

let initialState = {
  status: null,
  error: null,
  data: [],
  retry: 0
}

export const licenseList = (state = initialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.LICENSE_LISTS_FETCHING:
      return {
        ...state,
        status: 'FETCHING'
      }
    case types.LICENSE_LISTS_FETCHED:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.LICENSE_LISTS_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}

let licenseAddInitialState = {
  status: null,
  error: null,
  data: {},
  retry: 0
}

export const licenseAdd = (state = licenseAddInitialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.LICENSE_ADD_PENDING:
      return {
        ...state,
        status: 'FETCHING'
      }
    case types.LICENSE_ADD_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.LICENSE_ADD_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}

let licenseEditInitialState = {
  status: null,
  error: null,
  data: {},
  retry: 0
}

export const licenseEdit = (state = licenseEditInitialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.LICENSE_EDIT_PENDING:
      return {
        ...state,
        status: 'FETCHING'
      }
    case types.LICENSE_EDIT_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.LICENSE_EDIT_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}

let licenseDeleteInitialState = {
  status: null,
  error: null,
  data: {},
  retry: 0
}

export const licenseDelete = (state = licenseDeleteInitialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.LICENSE_DELETE_PENDING:
      return {
        ...state,
        status: 'FETCHING'
      }
    case types.LICENSE_DELETE_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.LICENSE_DELETE_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}

let licenseFetchByIdInitialState = {
  status: null,
  error: null,
  data: {},
  retry: 0
}

export const licenseFetchById = (state = licenseFetchByIdInitialState, action) => {
  const {type, error, data} = action
  switch (type) {
    case types.LICENSE_FINDONE_PENDING:
      return {
        ...state,
        status: 'FETCHING'
      }
    case types.LICENSE_FINDONE_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.LICENSE_FINDONE_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}
