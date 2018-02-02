import {all, takeLatest, call, put} from 'redux-saga/effects'
import * as types from './constants'
import {fetchBrandedSMS, changeBrandedSMSStatus} from './api'
function * fetchBrandedSMSWorker ({licenseId}) {
  try {
    const res = yield call(fetchBrandedSMS, licenseId)
    console.log('FUCK THE RESULT ', res)
    if (!res.error) {
      yield put({
        type: types.FETCH_BRANDED_SMS_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.error)
    }
  } catch (err) {
    yield put({
      type: types.FETCH_BRANDED_SMS_FAILED,
      error: err.message
    })
  }
}
function * changeBrandedSMSStatusWorker ({data}) {
  try {
    const res = yield call(changeBrandedSMSStatus, data)
    if (!res.error) {
      yield put({
        type: types.BRANDED_SMS_CHANGE_STATUS_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.error)
    }
  } catch (err) {
    yield put({
      type: types.BRANDED_SMS_CHANGE_STATUS_FAILED,
      error: err.message
    })
  }
}

export default function * () {
  yield all([
    takeLatest(types.FETCH_BRANDED_SMS_PENDING, fetchBrandedSMSWorker),
    takeLatest(types.BRANDED_SMS_CHANGE_STATUS_PENDING, changeBrandedSMSStatusWorker)
  ])
}
