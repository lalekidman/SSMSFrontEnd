import {all, takeLatest, call, put} from 'redux-saga/effects'
import * as types from './constants'
import {setCredits} from './actions'
import {fetchBrandedSMS, changeBrandedSMSStatus, fetchBrandedSMSById, addCreditOnBrandedSMS, editCreditOnBrandedSMS, deleteCreditOnBrandedSMS} from './api'
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
function * fetchBrandedSMSByIdWorker ({data}) {
  try {
    const res = yield call(fetchBrandedSMSById, data)
    if (!res.error) {
      yield put({
        type: types.FETCH_BRANDED_SMS_BY_ID_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.error)
    }
  } catch (err) {
    yield put({
      type: types.FETCH_BRANDED_SMS_BY_ID_FAILED,
      error: err.message
    })
  }
}
function * addCreditOnBrandedSMSWorker ({data}) {
  try {
    const res = yield call(addCreditOnBrandedSMS, data)
    if (!res.error) {
      yield put(setCredits(res.data.creditList))
      yield put({
        type: types.ADD_CREDIT_BRANDED_SMS_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.error)
    }
  } catch (err) {
    yield put({
      type: types.ADD_CREDIT_BRANDED_SMS_FAILED,
      error: err.message
    })
  }
}

function * editCreditOnBrandedSMSWorker ({data}) {
  try {
    const res = yield call(editCreditOnBrandedSMS, data)
    if (!res.error) {
      yield put(setCredits(res.data.creditList))
      yield put({
        type: types.EDIT_CREDIT_BRANDED_SMS_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.error)
    }
  } catch (err) {
    yield put({
      type: types.EDIT_CREDIT_BRANDED_SMS_FAILED,
      error: err.message
    })
  }
}

function * deleteCreditOnBrandedSMSWorker ({data}) {
  try {
    const res = yield call(deleteCreditOnBrandedSMS, data)
    if (!res.error) {
      yield put(setCredits(res.data.creditList))
      yield put({
        type: types.DELETE_CREDIT_BRANDED_SMS_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.error)
    }
  } catch (err) {
    yield put({
      type: types.DELETE_CREDIT_BRANDED_SMS_SUCCESS,
      error: err.message
    })
  }
}

export default function * () {
  yield all([
    takeLatest(types.FETCH_BRANDED_SMS_PENDING, fetchBrandedSMSWorker),
    takeLatest(types.FETCH_BRANDED_SMS_BY_ID_PENDING, fetchBrandedSMSByIdWorker),
    takeLatest(types.BRANDED_SMS_CHANGE_STATUS_PENDING, changeBrandedSMSStatusWorker),
    takeLatest(types.ADD_CREDIT_BRANDED_SMS_PENDING, addCreditOnBrandedSMSWorker),
    takeLatest(types.DELETE_CREDIT_BRANDED_SMS_PENDING, deleteCreditOnBrandedSMSWorker),
    takeLatest(types.EDIT_CREDIT_BRANDED_SMS_PENDING, editCreditOnBrandedSMSWorker)
  ])
}
