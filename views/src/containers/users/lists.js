import React from 'react'
import {connect} from 'react-redux'
import {fetchUser, deleteUser, setUserActiveStatus} from '../../redux/users/actions'
import { bindActionCreators } from 'redux'
import {showToastMessage} from '../../redux/toast/actions'
import RaisedButton from 'material-ui/RaisedButton'
import TextDisplay from '../../utils/TextDisplay'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { setTimeout } from 'timers';

const UserList = (props) => {
  const activeLabel = props.checkActiveStatus(props.status.actives)
  const activeButtonLabel = props.checkActiveStatus(props.status.actives)
  return (
    <tr>
      <td><TextDisplay label={props.name} /></td>
      <td><TextDisplay label={props.username} /></td>
      <td><TextDisplay label={props.email} /></td>
      <td><TextDisplay label={activeLabel} /></td>
      <td><TextDisplay label={props.roles} /></td>
      <td><TextDisplay label={props.license ? props.license.name : 'Empty'} /></td>
      <td>
        <RaisedButton label='edit' onClick={props.handleEditUser.bind(this, {userId: props.id, license: props.license})} />
        <RaisedButton label='delete' onClick={props.handleDeleteUser.bind(this, {accountId: props.id, license: props.license})} />
        <RaisedButton label={activeButtonLabel} onClick={props.handleActiveStatus.bind(this, {accountId: props.id, active: props.status.actives, name: props.name})} />
      </td>
    </tr>
  )
}
class Users extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      deleteDialogOpen: false,
      activeDialogStatus: false,
      selectedUser: {},
      lists: [],
      filteredList: [],
      searchText: '',
      searchCompany: '',
    }
    this.Inbounce = false
    this.deleteDialogData = {}
    this.deleteDialogButtons = [
      <RaisedButton
        label='Cancel'
        keyboardFocused={true}
        onClick={this.handleDelete.status.bind(this, false)}
      />,
      <RaisedButton
        label='Okay'
        keyboardFocused={false}
        onClick={this.handleDelete.submit}
      />
    ]
    this.activeDialogButton = [
      <RaisedButton
        label='Cancel'
        keyboardFocused={true}
        onClick={this.handleActive.status.bind(this, false)}
      />,
      <RaisedButton
        label='Okay'
        keyboardFocused={false}
        onClick={this.handleActive.submit}
      />
    ]
  }
  moveToAdd = () => {
    this.props.history.push('/users/add')
  }
  setLists = (props) => {
    this.setState({
      lists: props.userList.data,
      filteredList: props.userList.data
    })
  }
  handleUserListResponse (props) {
    const {userList} = props
    if (this.props.userList.status !== userList.status) {
      if (userList.status === 'FETCHED') {
        this.props.showToastMessage('Successfully fetch user lists.')
        this.setLists(props)
      } else if (userList.status === 'FETCHING') {
        this.props.showToastMessage('Fetching User List...')
      } else if (userList.status === 'FAILED') {
        this.props.showToastMessage('Failed to fetch user list. Please refresh the page. Thank you.')
      }
    }
  }
  handleUserDeleteResponse ({userDelete}) {
    if (this.props.userDelete.status !== userDelete.status) {
      if (userDelete.status === 'FETCHED') {
        this.props.showToastMessage('Successfully delete user.')
        this.handleDelete.status(false)
      } else if (userDelete.status === 'FETCHING') {
        this.props.showToastMessage('Deleting...')
      } else if (userDelete.status === 'FAILED') {
        this.props.showToastMessage(`Failed to delete user. Error: ${userDelete.error}`)
      }
    }
  }
  handleSetActiveStatusResponse ({activeStatus}) {
    if (this.props.activeStatus.status !== activeStatus.status) {
      const {selectedUser} = this.state
      const {name} =  selectedUser
      const status = this.checkActiveStatus(!selectedUser.active)
      if (activeStatus.status === 'FETCHED') {
        this.props.showToastMessage(`Successfully ${status} ${name}`)
        this.handleActive.status(false)
      } else if (activeStatus.status === 'PENDING') {
        this.props.showToastMessage(`Requesting ${status} to ${name}.`)
        // this.handleActive.status(false)
      } else if (activeStatus.status === 'FAILED') {
        this.props.showToastMessage(`Failed to set a status to ${name}, Please try again.`)
        this.handleActive.status(false)
      }
    }
  }
  checkActiveStatus = (active = false) => {
    return active ? 'Activate' : 'Deactivate'
  }
  get handleActive () {
    let self = this
    return {
      status: (status) => {
        self.setState({
          activeDialogStatus: status
        })
      },
      click: (data) => {
        self.setState({
          selectedUser: data
        })
        self.handleActive.status(true)
      },
      submit: () => {
        this.props.setUserActiveStatus(self.state.selectedUser)
      }
    }
  }
  get handleDelete () {
    let self = this
    return {
      click: (data) => {
        self.deleteDialogData = data
        self.handleDelete.status(true)
      },
      status: (status = false) => {
        self.setState({
          deleteDialogOpen: status
        })
      },
      submit: () => {
        this.props.deleteUser(this.deleteDialogData)
      }
    }
  }

  handleEditUser = ({userId, license}) => {
    const licenseId = license ? license.id : '' 
    this.props.history.push(`/users/edit/${userId}/${licenseId}`)
  }
  get handleSearch () {
    let self = this
    return {
      company: (ev, ind, value) => {
        this.setState({
          searchCompany: value
        })
        console.log('TEst company: ', value)
        const {searchText} = self.state
        this.handleSearch.display(searchText, value)
      },
      text: (ev, value) => {
        window.clearTimeout(self.Inbounce)
        self.Inbounce = window.setTimeout(() => {
          if (self.state.searchText !== value) {
            self.setState({
              searchText: value
            })
            const {searchCompany} = self.state
            self.handleSearch.display(value, searchCompany)
          }
        }, 500)
      },
      display: (text = '', company = '') => {
        const {lists} = this.state
        this.setState({
          filteredList: lists.filter(el => {
            let name = el.name || ''
            let email = el.email || ''
            let username = el.username || ''
            let roles = el.roles[0] || ''
            let companyName = el.license ? el.license.name || '' : ''
            let companyId = el.license ? el.license.id || '' : ''
            // return this.recursiveSearch(el, value)
            // console.log('CIMAPN: ', (companyId.toString().toLowerCase().search(company.toLowerCase()) !== -1))
            // if (company) {
            //   return (companyId.toString().toLowerCase().search(company.toLowerCase()) !== -1)
            // } else {
              return (((name.toString().toLowerCase().search(text.toLowerCase()) !== -1) ||
                (email.toString().toLowerCase().search(text.toLowerCase()) !== -1) ||
                (username.toString().toLowerCase().search(text.toLowerCase()) !== -1) ||
                (roles.toString().toLowerCase().search(text.toLowerCase()) !== -1) ||
                (companyName.toString().toLowerCase().search(text.toLowerCase()) !== -1)) && (companyId.toString().toLowerCase().search(company.toLowerCase()) !== -1)) 
            // }
          })
        })
      },
      recursive: (el, value) => {
        const keys = Object.keys(el)
        const keyLen = keys.length
        for(let x = 0; x < keyLen; x++) {
          let txt = el[keys[x]]
          if (txt) {
            if (txt instanceof Object) {
              return this.recursiveSearch(txt, value)
            } else if (txt.toString().toLowerCase().search(value.toLowerCase()) !== -1) {
              console.log('field: ', keys[x])
              console.log('FUCKTEXT: ', txt)
              console.log('TRUE SHOULD STOP')
              return true
            }
          }
        }
      }
    }
  }
  componentWillUnmount () {
    window.clearTimeout(this.Inbounce)
  }
  componentDidUpdate () {
    // console.log('filtered lists: ', this.state.filteredList)
  }
  componentDidMount () {
    window.clearTimeout(this.Inbounce)
    if (this.props.userList.status !== 'FETCHED') {
      this.props.fetchUser()
    } else {
      this.setLists(this.props)
    }
  }
  componentWillReceiveProps (newProps) {
    this.handleUserListResponse(newProps)
    this.handleUserDeleteResponse(newProps)
    this.handleSetActiveStatusResponse(newProps)
  }
  shouldComponentUpdate (newProps) {
    return (newProps.userList.status === 'FETCHED')
  }
  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-2 col-lg-2'>
            <h4>UserFields</h4>
          </div>
          <div className='col-md-3 col-lg-3'>
            <TextField
              floatingLabelText='Search...'
              type='text'
              fullWidth={true}
              style={{marginTop:'-28px'}}
              onChange={this.handleSearch.text}
              />
          </div>
          <div className='col-md-3 col-lg-3'>
            <SelectField
              floatingLabelText='Companies.'
              style={{marginTop:'-28px'}}
              value={this.state.searchCompany}
              onChange={this.handleSearch.company}
            >
              {
                this.props.licenseList.data.map((el, ind)=>{
                  return (
                    <MenuItem key={ind} value={el.id} primaryText={el.name} />
                  )
                })
              }
            </SelectField>
          </div>
          <div className='col-md-2 col-lg-2'>
            <RaisedButton onClick={this.moveToAdd} label='Add'/>
          </div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <td>Name</td>
              <td>Username</td>
              <td>Email</td>
              <td>Status</td>
              <td>Role</td>
              <td>Company</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {
              this.state.filteredList.map((el, ind) => {
                return <UserList
                  key={ind} {...el}
                  handleDeleteUser={this.handleDelete.click}
                  handleEditUser={this.handleEditUser}
                  handleActiveStatus={this.handleActive.click}
                  checkActiveStatus={this.checkActiveStatus} />
              })
            }
          </tbody>
        </table>
        <Dialog
          title="Delete User"
          actions={this.deleteDialogButtons}
          modal={false}
          open={this.state.deleteDialogOpen}
          onRequestClose={this.handleDialogClose}
        >
          Are you sure you want to delete this user?
        </Dialog>
        <Dialog
          title="User Status"
          actions={this.activeDialogButton}
          modal={false}
          open={this.state.activeDialogStatus}
          onRequestClose={this.handleDialogClose}
        >
          Are you sure you want to <b>{this.checkActiveStatus(!this.state.selectedUser.active)}</b> {this.state.selectedUser.name}?
        </Dialog>
      </div>
    )
  }
}
const mapStateToProps = ({users, licenseList}) => {
  const {lists, deletes, activeStatus} = users
  return {
    userList: lists,
    userDelete: deletes,
    licenseList: licenseList,
    activeStatus: activeStatus
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUser,
    deleteUser,
    setUserActiveStatus,
    showToastMessage
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)
