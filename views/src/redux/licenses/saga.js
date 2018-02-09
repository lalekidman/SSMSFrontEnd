import * as types from './constants'
import {all, put, call, takeLatest} from 'redux-saga/effects'
import {fetchLicense, addLicense, editLicense, deleteLicense, fetchLicenseById, fetchLicenseMembersById, saveLicenseMembersById} from './api'
function * fetchLicenseWorker () {
  try {
    const res = yield call(fetchLicense)
    if (!res.err) {
      yield put({
        type: types.LICENSE_LISTS_FETCHED,
        data: res.data
      })
    } else {
      throw new Error(res.err)
    }
  } catch (err) {
    yield put({
      type: types.LICENSE_LISTS_FAILED,
      error: err.message
    })
  }
}
function * addLicenseWorker ({data}) {
  try {
    const res = yield call(addLicense, data)
    if (!res.err) {
      yield put({
        type: types.LICENSE_ADD_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.err)
    }
  } catch (err) {
    yield put({
      type: types.LICENSE_ADD_FAILED,
      error: err.message
    })
  }
}
function * editLicenseWorker ({data}) {
  try {
    const res = yield call(editLicense, data)
    if (!res.err) {
      yield put({
        type: types.LICENSE_EDIT_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.err)
    }
  } catch (err) {
    yield put({
      type: types.LICENSE_EDIT_FAILED,
      error: err.message
    })
  }
}
function * deleteLicenseWorker ({id}) {
  try {
    const res = yield call(deleteLicense, id)
    if (!res.err) {
      yield put({
        type: types.LICENSE_DELETE_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.err)
    }
  } catch (err) {
    yield put({
      type: types.LICENSE_DELETE_FAILED,
      error: err.message
    })
  }
}
function * fetchLicenseByIdWorker ({id}) {
  try {
    const res = yield call(fetchLicenseById, id)
    if (!res.err) {
      yield put({
        type: types.LICENSE_FINDONE_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.err)
    }
  } catch (err) {
    yield put({
      type: types.LICENSE_FINDONE_FAILED,
      error: err.message
    })
  }
}

function * fetchLicenseMembersWorker ({id}) {
  try {
    const res = yield call(fetchLicenseMembersById, id)
    if (!res.err) {
      yield put({
        type: types.LICENSE_MEMBERS_LISTS_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.err)
    }
  } catch (err) {
    yield put({
      type: types.LICENSE_MEMBERS_LISTS_FAILED,
      error: err.message
    })
  }
}

function * saveLicenseMembersWorker ({data}) {
  try {
    const res = yield call(saveLicenseMembersById, data)
    if (!res.error) {
      yield put({
        type: types.LICENSE_MEMBERS_SAVE_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.error)
    }
  } catch (err) {
    yield put({
      type: types.LICENSE_MEMBERS_SAVE_FAILED,
      error: err.message
    })
  }
}

export default function * () {
  yield all([
    takeLatest(types.LICENSE_LISTS_FETCHING, fetchLicenseWorker),
    takeLatest(types.LICENSE_EDIT_PENDING, editLicenseWorker),
    takeLatest(types.LICENSE_FINDONE_PENDING, fetchLicenseByIdWorker),
    takeLatest(types.LICENSE_ADD_PENDING, addLicenseWorker),
    takeLatest(types.LICENSE_DELETE_PENDING, deleteLicenseWorker),
    takeLatest(types.LICENSE_MEMBERS_SAVE_PENDING, saveLicenseMembersWorker),
    takeLatest(types.LICENSE_MEMBERS_LISTS_PENDING, fetchLicenseMembersWorker)
  ])
}
