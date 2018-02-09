import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBrandedSMS, changeBrandedSMSStatus} from '../../../../redux/brandedsms/actions'
import TextDisplay from '../../../../utils/TextDisplay'
import {showToastMessage} from '../../../../redux/toast/actions'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'

const ItemList = ({id, name, description, apikey, credit, enabled, status, handleChangeStatus, handleDelete, handleViewCredits}) => {
  return (
    <tr>
      <td><TextDisplay label={name} /></td>
      <td><TextDisplay label={description} /></td>
      <td><TextDisplay label={credit} /></td>
      <td><TextDisplay label={enabled ? 'Yes' : 'Not'} /></td>
      <td><TextDisplay label={status} /></td>
      <td>
        <RaisedButton
          style={{marginRight: 12}}
          label='Change Status'
          onClick={handleChangeStatus.bind(this, {id, status})}
        />
        <RaisedButton 
          label='View Credits'
          onClick={handleViewCredits.bind(this, id)}
        />
      </td>
    </tr>
  )
}
class BrandedSMS extends React.Component{
  constructor (props) {
    super (props)
    this.statuses = [
      'PENDING',
      'Not Approved',
      'Approved',
    ]
    this.state = {
      searchInbounce: false,
      changeStatusDialogStatus: false,
      selectedStatus: '',
      filteredList: []
    }
    this.initialURL = props.match.url
    this.selectedId = null
    this.changeStatusActions = [
      <RaisedButton
        style={{marginRight: 12}}
        label='Cancel'
        onClick={this.handleChangeStatusDialog.show.bind(this, false)}
      />,
      <RaisedButton
        label='Submit'
        onClick={this.handleChangeStatusDialog.submit}
      />,
    ]
  }
  handleViewCredits = (id) => {
    this.props.history.push(`${this.initialURL}/${id}/credits`)
  }
  
  handleChangeStatus = (id) => {
    this.selectedId = id
    this.handleChangeStatusDialog.show(true)
  }
  get handleChangeStatusDialog () {
    return {
      show: (status = false) => {
        this.setState({
          changeStatusDialogStatus: status
        })
      },
      click: ({status, id}) => {
        this.selectedId = id
        this.setState({
          selectedStatus: status ? status.toUpperCase() : this.statuses[0].toUpperCase()
        })
        this.handleChangeStatusDialog.show(true)
      },
      submit: () => {
        this.props.changeBrandedSMSStatus({
          id: this.selectedId,
          status: this.state.selectedStatus
        })
      },
      change: (ev, ind, value) => {
        this.setState({
          selectedStatus: value
        })
      }
    }
  }
  get handleSearch () {
    return {
      text: (ev, value) => {
        window.clearTimeout(this.searchInbounce)
        this.searchInbounce = window.setTimeout(() => {
          this.handleSearch.display(value)
        }, 500)
      },
      display: (text = '', props) => {
        const {brandedSMSList} = props || this.props
        this.setState({
          filteredList: brandedSMSList.data.filter(el => {
            const {name='', description=''} = el
            return (
              name.toString().toLowerCase().search(text) !== -1 ||
              description.toString().toLowerCase().search(text) !== -1
            )
          }).map((el, ind) => {
            return <ItemList key={ind} {...el} handleChangeStatus={this.handleChangeStatusDialog.click} handleViewCredits={this.handleViewCredits} />
          })
        })
      }
    }
  }
  handleFetchBrandedSMSResponse (props) {
    const {brandedSMSList} = props
    if (this.props.brandedSMSList.status !== brandedSMSList.status) {
      if (brandedSMSList.status === 'FETCHED') {
        this.handleSearch.display('', props)
      }
    }
  }
  handleBrandedSMSChangeStatusResponse ({brandedSMSChangeStatus}) {
    if (brandedSMSChangeStatus.status !== this.props.brandedSMSChangeStatus.status) {
      if (brandedSMSChangeStatus.status === 'FETCHED') {
        this.props.showToastMessage('Successfully change status!')
        this.handleChangeStatusDialog.show(false)
      } else if (brandedSMSChangeStatus.status === 'FETCHING') {
        this.props.showToastMessage('Request to change status...')
      } else if (brandedSMSChangeStatus.status === 'FAILED') {
        this.props.showToastMessage(`Failed to change status. Error: ${brandedSMSChangeStatus.error}`)
        console.log('failed: error: ', brandedSMSChangeStatus.error)
      }
    }
  }
  componentDidMount () {
    const {licenseId} = this.props.match.params
    this.props.fetchBrandedSMS(licenseId)
    this.setState({
      selectedStatus: this.statuses[0].toUpperCase()
    })
    this.statusLists = this.statuses.map((el, ind) => {
      return <MenuItem value={el.toUpperCase()} primaryText={el} key={ind} />
    })
  }
  componentWillReceiveProps (newProps) {
    this.handleFetchBrandedSMSResponse(newProps)
    this.handleBrandedSMSChangeStatusResponse(newProps)
  }
  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-4'>
            <h2>BrandedSMS</h2>
          </div>
          <div className='col-md-4'>
            <TextField
              style={{marginTop: '-20px'}}
              floatingLabelText='Search...'
              onChange={this.handleSearch.text}
            />
          </div>
        </div>
        <hr />
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Credits</th>
              <th>Enabled</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredList}
          </tbody>
        </table>
        <Dialog
          title="Change Status"
          actions={this.changeStatusActions}
          modal={false}
          open={this.state.changeStatusDialogStatus}
          onRequestClose={this.handleChangeStatusDialog.show.bind(this, false)}
        >
          <SelectField 
            name='status'
            fullWidth={true}
            placeholder='QWERTY'
            floatingLabelText={'Status'}
            value={this.state.selectedStatus}
            onChange={this.handleChangeStatusDialog.change}
          >
            {
              this.statusLists
            }
          </SelectField>
        </Dialog>
      </div>
    )
  }
}
const mapStateToProps = ({brandedSMSList, brandedSMSChangeStatus}) => ({
  brandedSMSList,
  brandedSMSChangeStatus
})
const mapDispatchToProps = (dispatch) => (bindActionCreators({
  fetchBrandedSMS,
  showToastMessage,
  changeBrandedSMSStatus
}, dispatch))
export default connect(mapStateToProps, mapDispatchToProps)(BrandedSMS)