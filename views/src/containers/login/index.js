import React from 'react'
import Form from '../../utils/Form'
import './style.css'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux' 
import TextField from 'material-ui/TextField'
import {loginAdmin} from '../../redux/authentication/actions'
import {showToastMessage} from '../../redux/toast/actions'
class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: [
        {
          max: 30,
          min: 3,
          name: 'username',
          type: 'username',
          floatingLabel: 'Username'
        },
        {
          max: 30,
          min: 3,
          name: 'password',
          type: 'password',
          floatingLabel: 'Password',
          validation: false
        }
      ],
      formButton: {
        status: false,
        label: 'LOGIN'
      }
    }
  }
  setFormButton (label = null, status = true) {
    this.setState({
      formButton: {
        label,
        status
      }
    })
  }
  componentWillReceiveProps (newProps) {
    this.handleLoginResponse(newProps)
  }
  handleLoginResponse ({userAuth}) {
    if (userAuth.status !== this.props.userAuth.status) {
      if (userAuth.status === 'AUTHENTICATING') {
        this.props.showToastMessage("Authenticating...")
        this.setFormButton('Authenticating', true)
      } else if (userAuth.status === 'FAILED') {
        this.props.showToastMessage(userAuth.error)
        this.setFormButton('LOGIN', false)
      } else if (userAuth.status === 'AUTHENTICATED') {
        this.props.showToastMessage("Authenticated!")
        this.setFormButton('Authenticated', true)
      }
    }
  }
  handleSubmit = (data) => {
    this.props.loginAdmin(data)
  }
  render () {
    return (
      <div className='container'>
        <div className='loginForm'>
          <h2>Login Form</h2>
          <Form data={this.state.formData} formButton={this.state.formButton} handleSubmit={this.handleSubmit} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({userAuth}) => {
  return {
    userAuth
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginAdmin,
    showToastMessage
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
