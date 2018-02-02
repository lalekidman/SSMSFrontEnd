import React from 'react'
import Form from '../../../utils/Form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {editLicense, fetchLicenseById} from '../../../redux/licenses/actions'
import {showToastMessage} from '../../../redux/toast/actions'
class GeneralForm extends React.Component {
  constructor (props) {
    super(props)
    console.log('initiate add form comapany')
    this.state = {
      formButton: {
        status: false,
        label: 'SUBMIT'
      },
      formData: [
        {
          max: 40,
          min: 4,
          type: 'text',
          name: 'name',
          floatingLabel: 'Company Name'
        },
        {
          max: 40,
          min: 4,
          type: 'email',
          name: 'email',
          floatingLabel: 'Company Email'
        },
        {
          max: 40,
          min: 4,
          type: 'select',
          name: 'package',
          floatingLabel: 'Package Type',
          modelValue: '',
          options: [
            {
              value: 'A',
              label: 'A'
            },
            {
              value: 'B',
              label: 'B'
            },
            {
              value: 'C',
              label: 'C'
            }
          ]
        }
      ]
    }
  }
  setFormButton (label = 'SUBMIT', status = false) {
    this.setState({
      formButton: {
        label,
        status
      }
    })
  } 
  handleBackButton = () => {
    this.props.history.push('/company')
  }
  handleSubmit = (data) => {
    const {licenseId} = this.props.match.params
    Object.assign(data, {id: licenseId})
    this.props.editLicense(data)
  }
  handleEditLicenseResponse ({licenseEdit}) {
    if (this.props.licenseEdit.status !== licenseEdit.status) {
      if (licenseEdit.status === 'FETCHED') {
        this.props.showToastMessage('Successfully edit new license!')
        this.setFormButton('SUBMITED', true)
        this.handleBackButton()
      } else if (licenseEdit.status === 'FETCHING') {
        this.props.showToastMessage('Request edit license...')
        this.setFormButton('Submitting...', true)
      } else if (licenseEdit.status === 'FAILED') {
        this.props.showToastMessage(`Failed to edit new license. Error: ${licenseEdit.error}`)
        this.setFormButton('SUBMIT', false)
      }
    }
  }
  handlelicenseFetchByIdResponse ({licenseFetchById}, force = false) {
    if (this.props.licenseFetchById.status !== licenseFetchById.status || force) {
      if (licenseFetchById.status === 'FETCHED') {
        const {formData} = this.state
        const {data} = licenseFetchById
        const keys = Object.keys(data)
        const len = keys.length
        const formDataLen = formData.length
        for (let x = 0; x < formDataLen; x++) {
          for (let y = 0; y < len; y++) {
            if (formData[x].name === keys[y]) {
              formData[x].modelValue = data[keys[y]]
            }
          }
        }
        this.setState({
          formData
        })
      }
    }
  }
  componentDidMount () {
    this.handlelicenseFetchByIdResponse(this.props, true)
  }
  componentWillReceiveProps (props) {
    this.handleEditLicenseResponse(props)
    this.handlelicenseFetchByIdResponse(props)
  }
  render () {
    return (
      <div>
        <h1>Edit Company</h1>
        <Form
          data={this.state.formData}
          handleSubmit={this.handleSubmit}
          handleBackButton={this.handleBackButton}
          formButton={this.state.formButton}
          />
      </div>
    )
  }
}
const mapStateToProps = ({licenseEdit, licenseFetchById}) => {
  return {
    licenseEdit,
    licenseFetchById
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editLicense,
    fetchLicenseById,
    showToastMessage
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(GeneralForm)
