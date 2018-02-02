import {put, all, call, takeLatest} from 'redux-saga/effects'
import * as types from './constants'
import {fetchUser, addUser, updateUser, deleteUser, fetchSingleUser, setUserActiveStatus} from './api'
function * userListWorker () {
  try {
    const res = yield call(fetchUser)
    if (!res.err) {
      yield put({
        type: types.USER_LIST_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.err)
    }
  } catch (err) {
    yield put({
      type: types.USER_LIST_FAILED,
      error: err.message
    })
  }
}

function * userAddWorker ({data}) {
  try {
    const res = yield call(addUser, data)
    if (!res.err) {
      yield put({
        type: types.USER_ADD_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.err)
    }
  } catch (err) {
    yield put({
      type: types.USER_ADD_FAILED,
      error: err.message
    })
  }
}
function * updateUserWorker ({data}) {
  try {
    const res = yield call(updateUser, data)
    if (!res.err) {
      yield put({
        type: types.USER_UPDATE_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.err)
    }
  } catch (err) {
    yield put({
      type: types.USER_UPDATE_FAILED,
      error: err.message
    })
  }
}
function * deleteUserWorker ({data}) {
  try {
    const res = yield call(deleteUser, data)
    if (!res.err) {
      yield put({
        type: types.USER_DELETE_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.err)
    }
  } catch (err) {
    yield put({
      type: types.USER_DELETE_FAILED,
      error: err.message
    })
  }
}

function * fetchSingleUserWorker ({data}) {
  try {
    const res = yield call(fetchSingleUser, data)
    if (!res.err) {
      yield put({
        type: types.FETCH_SINGLE_USER_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.err)
    }
  } catch (err) {
    yield put({
      type: types.FETCH_SINGLE_USER_FAILED,
      error: err.message
    })
  }
}
function * setActiveStatusWorker ({data}) {
  try {
    const res = yield call(setUserActiveStatus, data)
    if (!res.err) {
      yield put({
        type: types.SET_USER_ACTIVE_STATUS_SUCCESS,
        data: res.data
      })
    } else {
      throw new Error(res.err)
    }
  } catch (err) {
    yield put({
      type: types.SET_USER_ACTIVE_STATUS_FAILED,
      error: err.message
    })
  }
}

export default function * () {
  yield all([
    takeLatest(types.USER_LIST_PENDING, userListWorker),
    takeLatest(types.USER_ADD_PENDING, userAddWorker),
    takeLatest(types.USER_UPDATE_PENDING, updateUserWorker),
    takeLatest(types.USER_DELETE_PENDING, deleteUserWorker),
    takeLatest(types.SET_USER_ACTIVE_STATUS_PENDING, setActiveStatusWorker),
    takeLatest(types.FETCH_SINGLE_USER_PENDING, fetchSingleUserWorker)
  ])
}
