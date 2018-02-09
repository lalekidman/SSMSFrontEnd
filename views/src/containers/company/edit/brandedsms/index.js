import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Lists from './lists'
import Credits from './credits/index'
import {showToastMessage} from '../../../../redux/toast/actions'
import {fetchBrandedSMS} from '../../../../redux/brandedsms/actions'
import {Route} from 'react-router-dom'
class BrandedSMS extends React.Component {
  constructor (props) {
    super(props)
    this.initialURL = props.match.path
    console.log('INITIALS:Z', this.initialURL)
  }
  componentDidMount () {
    const {licenseId} = this.props.match.params
    this.props.fetchBrandedSMS(licenseId)
    console.log('propsy: ', this.props)
  }
  shouldComponentUpdate ({brandedSMSList}) {
    return brandedSMSList.status === 'FETCHED'
  }
  render () {
    return (
      <div>
        <Route path={`${this.initialURL}`} exact component={Lists} />
        <Route path={`${this.initialURL}/:brandedSmsId/credits`} component={Credits} />
      </div>
    )
  }
}
const mapStateToProps = ({brandedSMSList}) => ({
  brandedSMSList
})
const mapDispatchToProps = (dispatch) => (bindActionCreators({
  fetchBrandedSMS,
  showToastMessage
}, dispatch))
export default connect(mapStateToProps, mapDispatchToProps)(BrandedSMS)
