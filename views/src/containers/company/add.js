import React from 'react'
import Form from '../../utils/Form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addLicense} from '../../redux/licenses/actions'
import {showToastMessage} from '../../redux/toast/actions'
class AddForm extends React.Component {
  constructor (props) {
    super(props)
    console.log('initiate add form comapany')
    this.state = {
      formButton: {
        status: false,
        label: 'SUBMIT'
      }
    }
    this.formData = [
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
        name: 'packageType',
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
    this.props.addLicense(data)
  }
  handleAddLicenseResponse ({licenseAdd}) {
    if (this.props.licenseAdd.status !== licenseAdd.status) {
      if (licenseAdd.status === 'FETCHED') {
        this.props.showToastMessage('Successfully add new license!')
        this.setFormButton('SUBMITED', true)
        this.handleBackButton()
      } else if (licenseAdd.status === 'FETCHING') {
        this.props.showToastMessage('Request add license...')
        this.setFormButton('Submitting...', true)
      } else if (licenseAdd.status === 'FAILED') {
        this.props.showToastMessage(`Failed to add new license. Error: ${licenseAdd.error}`)
        this.setFormButton('SUBMIT', false)
      }
    }
  }
  componentWillReceiveProps (props) {
    this.handleAddLicenseResponse(props)
  }
  render () {
    return (
      <div>
        <h1>Add Company</h1>
        <Form
          data={this.formData}
          handleSubmit={this.handleSubmit}
          handleBackButton={this.handleBackButton}
          formButton={this.state.formButton}
          />
      </div>
    )
  }
}
const mapStateToProps = ({licenseAdd}) => {
  return {
    licenseAdd
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addLicense,
    showToastMessage
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AddForm)
