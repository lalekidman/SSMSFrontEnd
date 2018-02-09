import * as types from './constants'

const fetchBrandedSMSInitialState = {
  status: null,
  data: {},
  error: null,
  retry: 0
}

export const brandedSMSListReducer = (state = fetchBrandedSMSInitialState, action) => {
  const {type, data, error} = action
  switch (type) {
    case types.FETCH_BRANDED_SMS_PENDING:
      return {
        ...state,
        status: 'PENDING'
      }
    case types.FETCH_BRANDED_SMS_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.FETCH_BRANDED_SMS_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}

const changeBrandedSMSStatusInitialState = {
  status: null,
  data: {},
  error: null,
  retry: 0
}

export const brandedSMSChangeStatusReducer = (state = changeBrandedSMSStatusInitialState, action) => {
  const {type, data, error} = action
  switch (type) {
    case types.BRANDED_SMS_CHANGE_STATUS_PENDING:
      return {
        ...state,
        status: 'PENDING'
      }
    case types.BRANDED_SMS_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.BRANDED_SMS_CHANGE_STATUS_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}
const fetchBrandedSMSByIdInitialState = {
  status: null,
  data: {},
  error: null,
  retry: 0
}

export const brandedSMSFetchById = (state = fetchBrandedSMSByIdInitialState, action) => {
  const {type, data, error, creditList} = action
  switch (type) {
    case types.FETCH_BRANDED_SMS_BY_ID_PENDING:
      return {
        ...state,
        status: 'PENDING'
      }
    case types.FETCH_BRANDED_SMS_BY_ID_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.FETCH_BRANDED_SMS_BY_ID_FAILED:
      return {
        ...state,
        status: 'FAILED'
      }
    case types.SET_BRANDED_SMS_CREDIT_BY_ID:
      return {
        ...state,
        data: {
          ...state.data,
          creditList
        }
      }
    default:
      return state
  }
}
const addCreditOnBrandedSMSInitialState = {
  status: null,
  data: {},
  error: null,
  retry: 0
}

export const brandedSMSAddCredit = (state = addCreditOnBrandedSMSInitialState, action) => {
  const {type, data, error} = action
  switch (type) {
    case types.ADD_CREDIT_BRANDED_SMS_PENDING:
      return {
        ...state,
        status: 'PENDING'
      }
    case types.ADD_CREDIT_BRANDED_SMS_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.ADD_CREDIT_BRANDED_SMS_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}
const editCreditOnBrandedSMSInitialState = {
  status: null,
  data: {},
  error: null,
  retry: 0
}

export const brandedSMSEditCredit = (state = editCreditOnBrandedSMSInitialState, action) => {
  const {type, data, error} = action
  switch (type) {
    case types.EDIT_CREDIT_BRANDED_SMS_PENDING:
      return {
        ...state,
        status: 'PENDING'
      }
    case types.EDIT_CREDIT_BRANDED_SMS_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.EDIT_CREDIT_BRANDED_SMS_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}

const deleteCreditOnBrandedSMSInitialState = {
  status: null,
  data: {},
  error: null,
  retry: 0
}

export const brandedSMSDeleteCredit = (state = deleteCreditOnBrandedSMSInitialState, action) => {
  const {type, data, error} = action
  switch (type) {
    case types.DELETE_CREDIT_BRANDED_SMS_PENDING:
      return {
        ...state,
        status: 'PENDING'
      }
    case types.DELETE_CREDIT_BRANDED_SMS_SUCCESS:
      return {
        ...state,
        status: 'FETCHED',
        data
      }
    case types.DELETE_CREDIT_BRANDED_SMS_FAILED:
      return {
        ...state,
        status: 'FAILED',
        error
      }
    default:
      return state
  }
}
