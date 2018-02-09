import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import TextDisplay from '../../../../../utils/TextDisplay'
import NumberField from '../../../../../utils/NumberField'
import {addCredits, editCredit, deleteCredit} from '../../../../../redux/brandedsms/actions'
import {showToastMessage} from '../../../../../redux/toast/actions'
const ItemLists = (props) => {
  return (
    <tr>
      <td>{props.amount || 0}</td>
      <td><TextDisplay label={props.date} /></td>
      <td>
        <RaisedButton
          label='edit'
          onClick={props.handleEditButton.bind(this, props)}
        />
        <RaisedButton
          label='delete'
          onClick={props.handleDeleteButton.bind(this, props)}
        />
      </td>
    </tr>
  )
}
class CreditList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      brandedSMSData: {
        name: null
      },
      addCreditValue: 0,
      addCreditSubmitButtonStatus: true,
      addCreditDialogStatus: false,
      
      editCreditValue: 0,
      editCreditSubmitButtonStatus: true,
      editCreditDialogStatus: false,

      deleteCreditDialogStatus: false,
      deleteCreditSubmitButtonStatus: false,
      lists: [],
    }
    this.selectedCredit = {}
  }
  handleBrandedSmsFetchByIdResponse ({brandedSMSFetchById}, force) {
    if ((brandedSMSFetchById.status !== this.props.brandedSMSFetchById.status) || force) {
      if (brandedSMSFetchById.status === 'FETCHED') {
        const {creditList = []} = brandedSMSFetchById.data
        this.setState({
          lists: creditList.map((el, ind) => (
            <ItemLists key={ind} {...el} handleEditButton={this.handleEditButton} handleDeleteButton={this.handleDeleteButton} />
          )),
          brandedSMSData: brandedSMSFetchById.data
        })
      }
    }
  }
  handleBrandedSMSAddCreditResponse ({brandedSMSAddCredit, ...props}) {
    if (this.props.brandedSMSAddCredit.status !== brandedSMSAddCredit.status) {
      if (brandedSMSAddCredit.status === 'FETCHED') {
        this.props.showToastMessage('Successfully add credit!')
        this.handleAddCreditDialog.show(false)
        this.handleBrandedSmsFetchByIdResponse(props, true)
      } else if (brandedSMSAddCredit.status === 'FETCHING') {
        this.props.showToastMessage('Requesting for add credit.')
        this.handleAddCreditDialog.show(false)
      } else if (brandedSMSAddCredit.status === 'FAILED') {
        this.props.showToastMessage('Failed to add credit. Error: ', brandedSMSAddCredit.error)
        this.handleAddCreditDialog.show(false)
      }
    }
  }
  handleBrandedSMSEditCreditResponse ({brandedSMSEditCredit, ...props}) {
    if (this.props.brandedSMSEditCredit.status !== brandedSMSEditCredit.status) {
      if (brandedSMSEditCredit.status === 'FETCHED') {
        this.props.showToastMessage('Successfully update credit!')
        this.handleEditCreditDialog.show(false)
        this.handleBrandedSmsFetchByIdResponse(props, true)
      } else if (brandedSMSEditCredit.status === 'FETCHING') {
        this.props.showToastMessage('Requesting for update credit.')
        this.handleEditCreditDialog.show(false)
      } else if (brandedSMSEditCredit.status === 'FAILED') {
        this.props.showToastMessage('Failed to update credit. Error: ', brandedSMSEditCredit.error)
        this.handleEditCreditDialog.show(false)
      }
    }
  }
  handleBrandedSMSDeleteCreditResponse ({brandedSMSDeleteCredit, ...props}) {
    if (this.props.brandedSMSDeleteCredit.status !== brandedSMSDeleteCredit.status) {
      if (brandedSMSDeleteCredit.status === 'FETCHED') {
        this.props.showToastMessage('Successfully delete selected credit!')
        this.handleDeleteCreditDialog.show(false)
        this.handleBrandedSmsFetchByIdResponse(props, true)
      } else if (brandedSMSDeleteCredit.status === 'FETCHING') {
        this.props.showToastMessage('Requesting for delete a credit.')
        this.handleDeleteCreditDialog.show(false)
      } else if (brandedSMSDeleteCredit.status === 'FAILED') {
        this.props.showToastMessage('Failed to delete a credit. Error: ', brandedSMSDeleteCredit.error)
        this.handleDeleteCreditDialog.show(false)
      }
    }
  }
  get handleAddCreditDialog () {
    return {
      show: (status = false) => {
        this.setState({
          addCreditDialogStatus: status
        })
      },
      submit: () => {
        const {addCreditValue} = this.state
        const {brandedSmsId} = this.props.match.params
        this.props.addCredits({
          id: brandedSmsId,
          credit: addCreditValue
        })
      }
    }
  }
  handleAddCreditChange = ({credit}) => {
    if (credit) {
      this.setState({
        addCreditValue: credit,
        addCreditSubmitButtonStatus: false
      })
    } else {
      this.setState({
        addCreditSubmitButtonStatus: true
      })
    }
  }
  handleEditButton = (data) => {
    this.selectedCredit = data
    this.setState({
      editCreditValue: this.selectedCredit.amount,
    })
    this.handleEditCreditDialog.show(true)
  }
  get handleEditCreditDialog () {
    return {
      show: (status = false) => {
        this.setState({
          editCreditDialogStatus: status
        })
      },
      submit: () => {
        const {editCreditValue} = this.state
        const {brandedSmsId} = this.props.match.params
        this.props.editCredit({
          id: brandedSmsId,
          creditId: this.selectedCredit._id,
          amount: editCreditValue
        })
      }
    }
  }
  handleEditCreditChange = ({credit}) => {
    if (credit) {
      this.setState({
        editCreditValue: credit,
        editCreditSubmitButtonStatus: false
      })
    } else {
      this.setState({
        editCreditSubmitButtonStatus: true
      })
    }
  }
  handleDeleteButton = (data) => {
    this.selectedCredit = data
    this.handleDeleteCreditDialog.show(true)
  }
  get handleDeleteCreditDialog () {
    return {
      show: (status = false) => {
        this.setState({
          deleteCreditDialogStatus: status
        })
      },
      submit: () => {
        const {editCreditValue} = this.state
        const {brandedSmsId} = this.props.match.params
        this.props.deleteCredit({
          id: brandedSmsId,
          creditId: this.selectedCredit._id,
        })
      }
    }
  }
  componentWillReceiveProps (newProps) {
    this.handleBrandedSmsFetchByIdResponse(newProps)
    this.handleBrandedSMSAddCreditResponse(newProps)
    this.handleBrandedSMSEditCreditResponse(newProps)
    this.handleBrandedSMSDeleteCreditResponse(newProps)
  }
  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h3>
              {this.state.brandedSMSData.name} Credit List
            </h3>
          </div>
          <div className='col-md-3'>
            <RaisedButton
              label='Add Credit'
              onClick={this.handleAddCreditDialog.show.bind(this, true)}
            />
          </div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Credit</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lists}
          </tbody>
        </table>

        <Dialog
          title='Add Credit'
          actions={[
            <RaisedButton
              label='Cancel'
              onClick={this.handleAddCreditDialog.show.bind(this, false)}
            />,
            <RaisedButton
              label='Submit'
              onClick={this.handleAddCreditDialog.submit}
              disabled={this.state.creditSubmitButtonStatus}
            />
          ]}
          modal={false}
          open={this.state.addCreditDialogStatus}
          onRequestClose={this.handleAddCreditDialog.show.bind(this, false)}
        >
          <NumberField
            floatingLabel='Credits'
            fullWidth={true}
            name='credit'
            modelValue={this.state.addCreditValue}
            handleChange={this.handleAddCreditChange}
            min={1}
            max={5}
          />
          <span>This Credit will be added through the selected brandedSMS</span>
        </Dialog>

        <Dialog
          title='Edit Credit'
          actions={[
            <RaisedButton
              label='Cancel'
              onClick={this.handleEditCreditDialog.show.bind(this, false)}
            />,
            <RaisedButton
              label='Submit'
              onClick={this.handleEditCreditDialog.submit}
              disabled={this.state.editCreditSubmitButtonStatus}
            />
          ]}
          modal={false}
          open={this.state.editCreditDialogStatus}
          onRequestClose={this.handleEditCreditDialog.show.bind(this, false)}
        >
          <NumberField
            floatingLabel='Credits'
            fullWidth={true}
            name='credit'
            modelValue={this.state.editCreditValue}
            handleChange={this.handleEditCreditChange}
            min={1}
            max={5}
          />
          <span>This Credit will be edit the selected credit.</span>
        </Dialog>
        <Dialog
          title='Delete Credit'
          actions={[
            <RaisedButton
              label='Cancel'
              onClick={this.handleDeleteCreditDialog.show.bind(this, false)}
            />,
            <RaisedButton
              label='Submit'
              onClick={this.handleDeleteCreditDialog.submit}
              disabled={this.state.deleteCreditSubmitButtonStatus}
            />
          ]}
          modal={false}
          open={this.state.deleteCreditDialogStatus}
          onRequestClose={this.handleDeleteCreditDialog.show.bind(this, false)}
        >
          <span>Are you sure you want to delete this credit</span>
        </Dialog>
      </div>
    )
  }
}
const mapStateToProps = ({brandedSMSFetchById, brandedSMSAddCredit, brandedSMSEditCredit, brandedSMSDeleteCredit}) => ({
  brandedSMSFetchById,
  brandedSMSAddCredit,
  brandedSMSDeleteCredit,
  brandedSMSEditCredit
})
const mapDispatchToProps = (dispatch) => (bindActionCreators({
  addCredits,
  editCredit,
  deleteCredit,
  showToastMessage
}, dispatch))
export default connect(mapStateToProps, mapDispatchToProps)(CreditList)
