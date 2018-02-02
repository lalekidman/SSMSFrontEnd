import * as types from './constants'

export const fetchUser = () => ({
  type: types.USER_LIST_PENDING
})

export const addUser = (data) => ({
  type: types.USER_ADD_PENDING,
  data
})

export const updateUser = (data) => ({
  type: types.USER_UPDATE_PENDING,
  data
})

export const deleteUser = (data) => ({
  type: types.USER_DELETE_PENDING,
  data
})

export const setUserActiveStatus = (data) => ({
  type: types.SET_USER_ACTIVE_STATUS_PENDING,
  data
})

export const fetchSingleUser = (data) => ({
  type: types.FETCH_SINGLE_USER_PENDING,
  data
})
