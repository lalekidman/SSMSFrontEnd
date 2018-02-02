import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import TextDisplay from '../../utils/TextDisplay'
import {deleteLicense} from '../../redux/licenses/actions'
import {showToastMessage} from '../../redux/toast/actions'
const ItemList = (props) => {
  return (
    <tr>
      <td><TextDisplay label={props.name} /></td>
      <td><TextDisplay label={props.code} /></td>
      <td><TextDisplay label={props.package} /></td>
      <td>
        <RaisedButton onClick={props.handleEdit.bind(this, props)} label='Edit' />
        <RaisedButton onClick={props.handleDelete.bind(this, props)} label='Delete' />
      </td>
    </tr>
  )
}
class CompanyList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: [],
      filteredLists: [],
      searchText: '',
      searchPackage: '',
      handleDeleteStatus: false
    }
    this.displayed = false
    this.searchInbounce = false
    this.selectedCompany = {}
    this.packageLists = [
      '',
      'A',
      'B',
      'C'
    ]
    
    this.deleteActions = [
      <RaisedButton
        label='Cancel'
        onClick={this.handleDelete.show.bind(this, false)}
      />,
      <RaisedButton
        label='Delete'
        onClick={this.handleDelete.submit}
      />
    ]
  }
  moveToAdd = () => {
    this.props.history.push('/company/add')
  }
  get handleDelete () {
    return {
      show: (status = false) => {
        this.setState({
          handleDeleteStatus: status
        })
      },
      submit: () => {
        console.log('fuck the subbmittt ', this.selectedCompany)
        this.props.deleteLicense(this.selectedCompany.id)
      }
    }
  }
  get handleSearch () {
    return {
      text: (ev, value) => {
        window.clearTimeout(this.searchInbounce)
        this.searchInbounce = window.setTimeout(() => {
          const {searchPackage} = this.state
          this.setState({
            searchText: value
          })
          this.handleSearch.display(value, searchPackage)
        }, 500)
      },
      packageType: (ev, ind, value) => {
        const {searchText} = this.state
        this.setState({
          searchPackage: value
        })
        this.handleSearch.display(searchText, value)
      },
      display: (text = '', packageTypeText = '') => {
        const {lists} = this.state
        this.setState({
          filteredLists: lists.filter(el => {
            const {name = '', code = '', package: packageType} = el
            return ((
              name.trim().toString().toLowerCase().search(text) !== -1 ||
              code.trim().toString().toLowerCase().search(text) !== -1
            ) && packageType.toString().toLocaleLowerCase().search(packageTypeText.toLocaleLowerCase()) !== -1)
          }).map((el, ind) => (
            <ItemList key={ind} {...el} handleDelete={this.handleAction.delete} handleEdit={this.handleAction.edit} />
          ))
        })
      }
    }
  }
  get handleAction () {
    return {
      delete: (data) => {
        this.selectedCompany = Object.assign({}, data)
        this.handleDelete.show(true)
      },
      edit: (data) => {
        this.props.history.push(`/company/edit/${data.id}`)
      }
    }
  }
  checkLicenseList ({licenseList}) {
    if (licenseList.status === 'FETCHED') {
      this.setState({
        lists: licenseList.data
      })
    }
  }
  handleLicenseDeleteResponse ({licenseDelete}) {
    if (this.props.licenseDelete.status !== licenseDelete.status) {
      if (licenseDelete.status === 'FETCHED') {
        this.props.showToastMessage(`Successfully deleted '${this.selectedCompany.name}' company.`)
        this.selectedCompany = {}
        this.handleDelete.show(false)
      } else if (licenseDelete.status === 'FETCHING') {
        this.props.showToastMessage(`Requesting to delete '${this.selectedCompany.name}' company...`)
      } else if (licenseDelete.status === 'FAILED') {
        this.props.showToastMessage(`Failed to deleted '${this.selectedCompany.name}' company, Error: ${licenseDelete.error} `)
      }
    }
  }
  handleLicenseListResponse (props) {
    if (this.props.licenseList.status !== props.licenseList.status) {
      this.checkLicenseList(props)
    }
  }
  componentDidMount () {
    this.packageListDisplay = this.packageLists.map((el, ind) => {
      return (
        <MenuItem key={ind} value={el} primaryText={el} />
      )
    })
    this.handleSearch.display()
  }
  componentWillMount () {
    this.checkLicenseList(this.props)
  }
  componentWillReceiveProps (newProps) {
    this.handleLicenseListResponse(newProps)
    this.handleLicenseDeleteResponse(newProps)
  }
  componentDidUpdate () {
    if (this.state.lists.length >= 1) {
      if (!this.displayed) {
        this.handleSearch.display()
        this.displayed = true
      }
    }
  }
  shouldComponentUpdate ({licenseList}) {
    return (licenseList.status === 'FETCHED')
  }
  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-2 col-lg-2'>
            <h4>Company Lists</h4>
          </div>
          <div className='col-md-3 col-lg-3'>
            <TextField
              floatingLabelText='Search...'
              type='text'
              fullWidth={true}
              style={{marginTop: '-28px'}}
              onChange={this.handleSearch.text}
              />
          </div>
          <div className='col-md-3 col-lg-3'>
            <SelectField
              floatingLabelText='Package Type'
              style={{marginTop:'-28px'}}
              value={this.state.searchPackage}
              onChange={this.handleSearch.packageType}
            >
              {this.packageListDisplay}
            </SelectField>
          </div>
          <div className='col-md-2 col-lg-2'>
            <RaisedButton onClick={this.moveToAdd} label='Add' />
          </div>
        </div>
        <table className='table table-hover table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>License</th>
              <th>Package Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredLists}
          </tbody>
        </table>
        <Dialog
          title="Delete License"
          actions={this.deleteActions}
          modal={false}
          open={this.state.handleDeleteStatus}
          onRequestClose={this.handleDelete.show.bind(this, false)}
        >
          Are you sure you want to delete this license?
        </Dialog>
      </div>
    )
  }
}
const mapStateToProps = ({licenseList, licenseDelete}) => {
  return {
    licenseList,
    licenseDelete
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deleteLicense,
    showToastMessage
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyList)
