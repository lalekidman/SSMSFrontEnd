import React from 'react'
import Form from '../../utils/Form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchSingleUser, updateUser} from '../../redux/users/actions'
import {showToastMessage} from '../../redux/toast/actions'
import { setTimeout } from 'timers';
import { LICENSE_LISTS_FETCHED } from '../../redux/licenses/constants';
class UserEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formButton: {
        label: 'Submit',
        status: false
      },
      formData: [
        {
          name: 'name',
          type: 'text',
          min: 2,
          max: 40,
          floatingLabel: 'Display Name'
        },
        {
          name: 'username',
          type: 'username',
          max: 40,
          min: 4,
          floatingLabel: 'Username'
        },
        {
          name: 'email',
          type: 'email',
          min: 6,
          max: 40,
          floatingLabel: 'Email Address'
        },
        {
          name: 'roles',
          type: 'select',
          floatingLabel: 'Roles',
          options: [
            {
              value: 'user',
              label: 'User'
            },
            {
              value: 'sub-admin',
              label: 'Sub-Admin'
            },
            {
              value: 'admin',
              label: 'Admin'
            },
          ]
        }
      ]
    }
  }
  setFormButton (label = '', status = false) {
    this.setState({
      formButton: {
        label,
        status
      }
    })
  }
  setLicenseOnFormData (props, formData) {
    if (props.singleFetch.status === 'FETCHED' && props.licenseList.status === 'FETCHED') {
      // let {formData} = this.state
      const licenseInd = formData.findIndex((el) => (el.name==='license'))
      if (licenseInd !== -1) {
        formData[licenseInd].modelValue = props.singleFetch.data.license._id
        this.setState({
          formData
        })
      }
    }
  }
  handleUserUpdateResponse({userUpdate}) {
    if (this.props.userUpdate.status !== userUpdate.status) {
      if (userUpdate.status === 'FETCHED') {
        this.props.showToastMessage('Successfully update user. ')
        this.props.history.push('/users')
      }
    }
  }
  handleSubmit = (data) => {
    const {accountId, licenseId} = this.props.match.params
    const userData = Object.assign(data, {id: accountId, oldLicenseId: licenseId})
    this.props.updateUser(userData)
  }
  handleSingleFetchResponse (props) {
    if (this.props.singleFetch.status !== props.singleFetch.status) {
      const {singleFetch} = props
      if (singleFetch.status === 'FETCHED') {
        const userKeys = Object.keys(singleFetch.data.user)
        const userLen = userKeys.length
        let subFormData = this.state.formData
        const formDataLen = subFormData.length
        for(let x = 0; x < userLen; x++) {
          for (let y = 0; y < formDataLen; y++) {
            if (subFormData[y].name === userKeys[x]) {
              subFormData[y].modelValue = singleFetch.data.user[userKeys[x]]
            }
          }
        }
        this.setState({
          formData: subFormData
        })
        // this.setLicenseOnFormData(props, subFormData)
      }
    }
  }
  handleFetchLicenseResponse (props) {
    if (props.licenseList.status !== this.props.licenseList.status) {
      const {licenseList} = props
      if (licenseList.status === 'FETCHED') {
        const {licenseId} = this.props.match.params
        const licenses = licenseList.data.map(el => ({value: el.id, label: el.name}))
        let {formData} = this.state
        formData.push({
          name: 'license_id',
          type: 'select',
          floatingLabel: 'Company',
          options: licenses,
          modelValue: licenseId
        })
        this.setState({
          formData
        })
        // this.setLicenseOnFormData(props, formData)
      }
    }
  }
  handleBackButton = () => {
    this.props.history.push('/users')
  }
  componentDidMount () {
    const {accountId, licenseId} = this.props.match.params
    if (accountId) {
      this.props.fetchSingleUser({
        accountId,
        licenseId
      })
    } else {
      this.props.showToastMessage('UserId didn\'t found. redirecting to User List.')
      setTimeout(() => { this.props.history.push('/users') }, 500)
    }
  }
  componentWillReceiveProps (newProps) {
    this.handleFetchLicenseResponse(newProps)
    this.handleSingleFetchResponse(newProps)
    this.handleUserUpdateResponse(newProps)
  }
  render () {
    return (
      <div>
        <h4>EDIT USER</h4>
        <Form
          data={this.state.formData}
          handleSubmit={this.handleSubmit}
          formButton={this.state.formButton}
          handleBackButton={this.handleBackButton}
          />
      </div>
    )
  }
}
const mapStateToProps = ({licenseList, users}) => {
  return {
    licenseList,
    singleFetch: users.sigleFetch,
    userUpdate: users.update,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchSingleUser,
    updateUser,
    showToastMessage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
