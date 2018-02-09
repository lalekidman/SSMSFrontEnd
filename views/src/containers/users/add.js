import React from 'react'
import Form from '../../utils/Form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addUser} from '../../redux/users/actions'
import {showToastMessage} from '../../redux/toast/actions'
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
          name: 'display_name',
          type: 'text',
          min: 2,
          max: 40,
          floatingLabel: 'Display Name'
        },
        {
          name: 'username',
          type: 'username',
          max: 20,
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
          name: 'password',
          type: 'password',
          max: 20,
          min: 4,
          floatingLabel: 'Password'
        },
        {
          name: 'roles',
          type: 'select',
          floatingLabel: 'Roles',
          modelValue: null,
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
  setFormCompany ({licenseList}) {
    if (licenseList.status === 'FETCHED') {
      const licenses = licenseList.data.map(el => ({value: el.id, label: el.name}))
      let {formData} = this.state
      formData.push({
        name: 'license_id',
        type: 'select',
        floatingLabel: 'Company',
        options: licenses
      })
      this.setState({
        formData: formData
      })
    }
  }
  handleAddUserResponse ({userAdd}) {
    if (userAdd.status !== this.props.userAdd.status) {
      if (userAdd.status === 'FETCHED') {
        this.props.showToastMessage('Successfully created user.')
        this.setFormButton('Created', true)
        this.props.history.push('/users')
      } else if (userAdd.status === 'FETCHING') {
        this.props.showToastMessage('Creating User...')
        this.setFormButton('Creating...', true)
      } else if (userAdd.status === 'FAILED') {
        this.setFormButton('Submit', false)
        this.props.showToastMessage('Failed to create user. Please check all of the fields. Thank you.')
      }
    }
    console.log('RESPOnSE: ', userAdd)
  }
  handleSubmit = (data) => {
    this.props.addUser(data)
  }
  handleFetchLicenseResponse (props) {
    if (props.licenseList.status !== this.props.licenseList.status) {
      this.setFormCompany(props)
    }
  }
  handleBackButton = () => {
    this.props.history.push('/users')
  }
  componentDidMount () {
    this.setFormCompany(this.props)
  }
  componentWillReceiveProps (newProps) {
    this.handleFetchLicenseResponse(newProps)
    this.handleAddUserResponse(newProps)
  }
  render () {
    return (
      <div>
        <h4>Add User</h4>
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
  const {add} = users
  return {
    licenseList,
    userAdd: add
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addUser,
    showToastMessage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
