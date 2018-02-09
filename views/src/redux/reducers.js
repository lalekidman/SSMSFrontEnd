import {combineReducers} from 'redux'
import userAuth from './authentication/reducer'
import {userList, userAdd, userDelete, fetchSingleUser, userUpdate, setActiveStatus, userWithoutLicense} from './users/reducer'
import {licenseList, licenseAdd, licenseEdit, licenseDelete, licenseFetchById, licenseMembers, licenseMembersSave} from './licenses/reducer'
import {brandedSMSListReducer, brandedSMSChangeStatusReducer, brandedSMSFetchById, brandedSMSAddCredit, brandedSMSEditCredit, brandedSMSDeleteCredit} from './brandedsms/reducer'
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
  userWithoutLicense,
  licenseList,
  licenseEdit,
  licenseDelete,
  licenseFetchById,
  licenseAdd,
  licenseMembers,
  licenseMembersSave,

  brandedSMSList: brandedSMSListReducer,
  brandedSMSFetchById,
  brandedSMSAddCredit,
  brandedSMSEditCredit,
  brandedSMSDeleteCredit,
  brandedSMSChangeStatus: brandedSMSChangeStatusReducer
})
