import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Lists from './lists'
import {showToastMessage} from '../../../../../redux/toast/actions'
import {fetchBrandedSMSById} from '../../../../../redux/brandedsms/actions'
import {Route} from 'react-router-dom'
class Credits extends React.Component {
  constructor (props) {
    super(props)
    this.initialURL = props.match.path
  }
  componentDidMount () {
    const {licenseId, brandedSmsId: id} = this.props.match.params
    if (!id) {
      this.props.showToastMessage('brandedsms id is required. We will redirect through company lists.')
      this.props.history.push(`/company/edit/${licenseId}/brandedsms`)
    } else {
      this.props.fetchBrandedSMSById({
        id,
        licenseId
      })
    }
  }
  shouldComponentUpdate ({brandedSMSFetchById}) {
    return (brandedSMSFetchById.status === 'FETCHED')
  }
  render () {
    return (
      <div>
        <Route path={`${this.initialURL}/`} component={Lists} />
      </div>
    )
  }
}
const mapStateToProps = ({brandedSMSFetchById}) => ({
  brandedSMSFetchById
})
const mapDispatchToProps = (dispatch) => (bindActionCreators({
  showToastMessage,
  fetchBrandedSMSById
}, dispatch))
export default connect(mapStateToProps, mapDispatchToProps)(Credits)
