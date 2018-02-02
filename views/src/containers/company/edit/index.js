import React from 'react'
import {Route, Switch} from 'react-router-dom'
import General from './general'
import BrandedSMS from './brandedsms'
import Navigation from './navigation'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showToastMessage} from '../../../redux/toast/actions'
import {fetchLicenseById} from '../../../redux/licenses/actions'
class EditForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.licenseId = props.match.params.licenseId
    this.initialUrl = '/company/edit/:licenseId'
  }
  handleLicenseFetchByIdResponse ({licenseFetchById}) {
    if (this.props.licenseFetchById.status !== licenseFetchById.status) {
      if (licenseFetchById.status === 'FAILED') {
        this.props.showToastMessage('No data found on that id. Error: ', licenseFetchById.error)
        this.props.history.push('/company')
      }
    }
  }
  componentDidMount () {
    this.props.fetchLicenseById(this.licenseId)
  }
  componentWillReceiveProps (newProps) {
    this.handleLicenseFetchByIdResponse(newProps)
  }
  shouldComponentUpdate ({licenseFetchById}) {
    return (licenseFetchById.status === 'FETCHED')
  }
  render () {
    return this.props.licenseFetchById.status ? (
      <div className='row'>
        <div className='col-md-2'>
          <Navigation licenseId={this.licenseId} />
        </div>
        <div className='col-md-10'>
          <Switch>
            <Route path={`${this.initialUrl}/`} exact component={General} />
            <Route path={`${this.initialUrl}/brandedsms`} exact component={BrandedSMS} />
          </Switch>
        </div>
      </div>
    ) : null
  }
}
const mapStateToProps = ({licenseFetchById}) => {
  return {
    licenseFetchById
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchLicenseById,
    showToastMessage
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(EditForm)
