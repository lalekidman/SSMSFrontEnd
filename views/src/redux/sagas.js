import {all} from 'redux-saga/effects'
import authSaga from './authentication/saga'
import userSaga from './users/saga'
import licenseSaga from './licenses/saga'
import brandedSMSSaga from './brandedsms/saga'
export default function * () {
  yield all([
    authSaga(),
    userSaga(),
    brandedSMSSaga(),
    licenseSaga()
  ])
}
