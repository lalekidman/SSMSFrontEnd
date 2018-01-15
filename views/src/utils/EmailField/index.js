import React from 'react'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
class CEmailField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      fullWidth: props.fullWidth || false,
      value: props.defaultValue || '',
      modelValue: props.modelValue || ''
    }
  }
  setChanges (props) {
    this.handle.change({
      target: {
        name: props.name,
        value: props.modelValue || ''
      }
    })
  }
  componentDidMount () {
    if (this.props.modelValue) {
      this.setChanges(this.props)
    } else {
      this.callback({
        valid: false,
        value: this.state.value,
        name: this.props.name
      })
    }
  }
  componentWillReceiveProps (newProps) {
    if (typeof newProps.modelValue !== 'undefined') {
      if (this.props.modelValue !== newProps.modelValue) {
        this.setChanges(newProps)
      }
    }
  }
  callback ({value = null, name, valid = false}) {
    let data = {}
    data[name] = value
    this.props.handleChange(data)
  }
  setError (err = '') {
    this.setState({
      error: err
    })
  }
  get handle () {
    return {
      change: (ev) => {
        let val = ev.target.value
        this.setState({
          modelValue: val
        })
        let spaces = /\s/g
        let emailSign = /@{1}/g
        let emailPatt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
        let emailSignRes = val.match(emailSign)
        let emailPattRes = val.match(emailPatt)
        if (!val && this.props.isRequired) {
          this.setError(`${this.props.floatingLabel} is Required.`)
        } else if (val.match(spaces)) {
          this.setError(`${this.props.floatingLabel} must not contain any spaces.`)
        } else if (!emailSignRes || emailSignRes.length > 1) {
          this.setError(`${this.props.floatingLabel} must contain only one(1) \`@\` sign.`)
        } else if (!emailPattRes) {
          this.setError(`${this.props.floatingLabel} is invalid email address.`)
        } else {
          this.setState({
            error: ''
          })
          this.callback({
            valid: true,
            value: val,
            name: ev.target.name
          })
          return true
        }
        this.callback({
          valid: false,
          value: '',
          name: ev.target.name
        })
        return false
      },
      keyup: (ev, e) => {
        if (this.props.handleKeyUp) {
          this.props.handleKeyUp(ev.keyCode)
        }
      }
    }
  }
  render () {
    return (
      <div>
        <TextField
          hintText={this.props.placeholder}
          floatingLabelText={this.props.floatingLabel}
          // defaultValue={`${this.props.defaultValue}`}
          name={this.props.name}
          errorText={this.state.error}
          fullWidth={this.state.fullWidth}
          onChange={this.handle.change}
          value={this.state.modelValue}
          onKeyUp={this.handle.keyup}
        />
      </div>
    )
  }
}
CEmailField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  floatingLabel: PropTypes.string,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  modelValue: PropTypes.string
}
export default CEmailField
