import * as types from './constants'

export const showToastMessage = (message) => {
  return {
    type: types.SHOW_TOAST_MESSAGE,
    message
  }
}
