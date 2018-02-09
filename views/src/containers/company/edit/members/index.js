import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
// import Lists from './lists'
import {showToastMessage} from '../../../../redux/toast/actions'
import {fetchLicenseMembers, saveLicenseMembers} from '../../../../redux/licenses/actions'
import {fetchUserWithoutLicense} from '../../../../redux/users/actions'
import MemberList from './users'
import UserWithoutLicense from './no-license'

import TextDisplay from '../../../../utils/TextDisplay'
import RaisedButton from 'material-ui/RaisedButton'

import './style.css'
const Lists = (props) => {
  return (
    <tr>
      <td>{props.ind + 1}</td>
      <td><TextDisplay label={props.name} /></td>
      <td><RaisedButton
        label={props.label}
        onClick={props.handleClick.bind(this, props)}
        /></td>
    </tr>
  )
}

class Members extends React.Component {
  constructor (props) {
    super(props)
    this.initialURL = props.match.path
    this.state = {
      userWithoutLicense: [],
      users: [],
      applyButton: {
        label: 'Apply Changes',
        status: false
      }
    }
  }
  handleApplyChangeButton (label = 'Apply Changes', status = false) {
    this.setState({
      applyButton: {
        label,
        status
      }
    })
  }
  handleFetchUserWithoutLicenseResponse ({userWithoutLicense}) {
    if (this.props.userWithoutLicense.status !== userWithoutLicense.status) {
      if (userWithoutLicense.status === 'FETCHED') {
        this.setState({
          userWithoutLicense: userWithoutLicense.data
        })
      }
    }
  }
  handleLicenseMembersReponse ({licenseMembers}) {
    if (licenseMembers.status !== this.props.licenseMembers.status) {
      if (licenseMembers.status === 'FETCHED') {
        this.setState({
          users: licenseMembers.data
        })
      }
    }
  }
  handleSaveLicenseMembersResponse ({licenseMembersSave}) {
    console.log('savem ember response ', licenseMembersSave)
    if (licenseMembersSave.status !== this.props.licenseMembersSave.status) {
      if (licenseMembersSave.status === 'FETCHED') {
        this.props.showToastMessage('Successfully update members.')
        this.handleApplyChangeButton()
      } else if (licenseMembersSave.status === 'PENDING') {
        this.props.showToastMessage('Requesting for updating members.')
        this.handleApplyChangeButton('Applying Changes...', true)
      } else if (licenseMembersSave.status === 'FAILED') {
        this.props.showToastMessage(`Failed to update members. ERROR: ${licenseMembersSave.error}`)
        this.handleApplyChangeButton()
      }
    }
  }
  handleRemoveToMember = ({ind, ...props}) => {
    const {userWithoutLicense, users} = this.state
    userWithoutLicense.splice(ind, 1)
    users.push(props)
    this.setState({
      userWithoutLicense,
      users
    })
  }
  handleAddToMember = ({ind, ...props}) => {
    const {userWithoutLicense, users} = this.state
    users.splice(ind, 1)
    userWithoutLicense.push(props)
    this.setState({
      userWithoutLicense,
      users
    })
  }
  handleSaveChanges = () => {
    const {users} = this.state
    const {licenseId} = this.props.match.params
    this.props.saveLicenseMembers({
      members: users,
      id: licenseId
    })
  }
  componentDidMount () {
    const {licenseId} = this.props.match.params
    this.props.fetchLicenseMembers(licenseId)
    this.props.fetchUserWithoutLicense()
  }
  componentWillReceiveProps (newProps) {
    this.handleFetchUserWithoutLicenseResponse(newProps)
    this.handleLicenseMembersReponse(newProps)
    this.handleSaveLicenseMembersResponse(newProps)
    
  }
  shouldComponentUpdate ({licenseMembers, userWithoutLicense}) {
    return (licenseMembers.status === 'FETCHED' && userWithoutLicense.status === 'FETCHED')
  }
  render () {
    const userWithoutLicense = this.state.userWithoutLicense.map((el, ind) => (
      <Lists {...el} key={ind} ind={ind} label='Add' handleClick={this.handleRemoveToMember}/>
    ))
    const users = this.state.users.map((el, ind) => (
      <Lists {...el} key={ind} ind={ind} label= 'Remove' handleClick={this.handleAddToMember} />
    ))
    return (
      <div>
        <h1>MEMBERS</h1>
        <div className='row'>
          <div className='col-md-6'>
            <UserWithoutLicense lists={userWithoutLicense} />
          </div>
          <div className='col-md-6'>
            <MemberList lists={users} />
          </div>
        </div>
        <RaisedButton
          disabled={this.state.applyButton.status}
          label={this.state.applyButton.label}
          onClick={this.handleSaveChanges}
        />
      </div>
    )
  }
}
const mapStateToProps = ({licenseMembers, userWithoutLicense, licenseMembersSave}) => ({
  licenseMembers,
  userWithoutLicense,
  licenseMembersSave
})
const mapDispatchToProps = (dispatch) => (bindActionCreators({
  showToastMessage,
  fetchUserWithoutLicense,
  saveLicenseMembers,
  fetchLicenseMembers
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Members)
