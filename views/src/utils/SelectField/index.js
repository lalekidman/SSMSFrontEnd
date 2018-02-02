import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import PropTypes from 'prop-types'
class CTextField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      fullWidth: this.props.fullWidth || false,
      value: props.defaultValue || '',
      modelValue: this.props.modelValue || ''
    }
  }
  setChanges (props) {
    this.handle.change({
      target: {
        name: props.name,
        value: props.modelValue || ''
      }
    }, 1, props.modelValue || '')
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
      change: (ev, ind, val) => {
        this.setState({
          modelValue: val
        })
        if (!val && this.props.isRequired) {
          this.setError(`${this.props.floatingLabel} is required.`)
        } else {
          this.setState({
            error: ''
          })
          console.log({
            valid: true,
            value: val,
            name: this.props.name
          })
          this.callback({
            valid: true,
            value: val,
            name: this.props.name
          })
          return true
        }
        this.callback({
          valid: false,
          value: '',
          name: this.props.name
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
        <SelectField
          floatingLabelText={this.props.floatingLabel}
          name={this.props.name}
          onChange={this.handle.change}
          fullWidth={this.props.fullWidth}
          value={this.state.modelValue} >
          {this.props.options.map((el, ind) => {
            return (<MenuItem key={ind} value={el.value} primaryText={el.label} />)
          })}
        </SelectField>
      </div>
    )
  }
}
CTextField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  floatingLabel: PropTypes.string,
  fullWidth: PropTypes.bool,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  modelValue: PropTypes.string,
  options: PropTypes.array
}
export default CTextField
