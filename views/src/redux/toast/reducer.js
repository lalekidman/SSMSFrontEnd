import * as types from './constants' 
const initialState = {
  message: null,
  status: false
}

export default (state = initialState, action) => {
  const {type, message} = action
  switch (type) {
    case types.SHOW_TOAST_MESSAGE:
      return {
        ...state,
        status: true,
        message
      }
    case types.HIDE_TOAST_MESSAGE:
      return {
        ...state,
        status: false,
        message: null
      }
    default:
      return state
  }
}
