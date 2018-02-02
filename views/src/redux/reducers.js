import {combineReducers} from 'redux'
import userAuth from './authentication/reducer'
import {userList, userAdd, userDelete, fetchSingleUser, userUpdate, setActiveStatus} from './users/reducer'
import {licenseList, licenseAdd, licenseEdit, licenseDelete, licenseFetchById} from './licenses/reducer'
import {brandedSMSListReducer, brandedSMSChangeStatusReducer} from './brandedsms/reducer'
import toast from './toast/reducer'

export default combineReducers({
  userAuth,
  toast,
  // userList,
  // userAdd,
  users: combineReducers({
    lists: userList,
    add: userAdd,
    deletes: userDelete,
    update: userUpdate,
    activeStatus: setActiveStatus,
    sigleFetch: fetchSingleUser
  }),
  licenseList,
  licenseEdit,
  licenseDelete,
  licenseFetchById,
  licenseAdd,
  brandedSMSList: brandedSMSListReducer,
  brandedSMSChangeStatus: brandedSMSChangeStatusReducer
})
