import {put, all, takeLatest, call} from 'redux-saga/effects'
import * as types from './constants'
import {loginAdmin, verifyAdmin} from './api'
function * authenticationWorker ({data}) {
  try {
    const res = yield call(loginAdmin, data)
    if (res.authenticated) {
      console.log('FUCK DATA: ', res)
      yield put({
        type: types.LOGIN_SUCCESS,
        data: res.users
      })
      yield put({
        type: types.VERIFY_ADMIN_PENDING
      })
    } else {
      throw new Error(res.err_msg)
    }
  } catch (err) {
    yield put({
      type: types.LOGIN_FAILED,
      error: err.message
    })
  }
}
function * verifyAuthenticationWorker ({data}) {
  try {
    const res = yield call(verifyAdmin)
    if (res.authenticated) {
      yield put({
        type: types.VERIFY_ADMIN_SUCCESS,
        data: res.users
      })
    } else {
      throw new Error(res.err_msg)
    }
  } catch (err) {
    yield put({
      type: types.VERIFY_ADMIN_FAILED,
      error: err.message
    })
  }
}

export default function * () {
  yield all([
    takeLatest(types.LOGIN_PENDING, authenticationWorker),
    takeLatest(types.VERIFY_ADMIN_PENDING, verifyAuthenticationWorker)
  ])
}
