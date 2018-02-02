import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ListForm from './lists'
import addForm from './add'
import {connect} from 'react-redux'
import EditForm from './edit/index.js'
import {fetchLicense} from '../../redux/licenses/actions'
import { bindActionCreators } from 'redux'
class Company extends React.Component {
  componentDidMount () {
    if (this.props.licenseList.status !== 'FETCHED' && this.props.licenseList.status !== 'FETCHING') {
      this.props.fetchLicense()
    }
  }
  handleLicenseFetchResponse ({licenseList}) {
    if (licenseList.status !== this.props.licenseList.status) {
      if (licenseList.status === 'FETCHED') {
        console.log('GG KANOR')
      }
    }
  }
  componentWillReceiveProps (newProps) {
    this.handleLicenseFetchResponse(newProps)
  }
  shouldComponentUpdate (newProps) {
    return (newProps.licenseList.status === 'FETCHED')
  }
  render () {
    return (
      <div>
        <Switch>
          <Route path='/company' exact component={ListForm} />
          <Route path='/company/add' exact component={addForm} />
          <Route path='/company/edit/:licenseId' component={EditForm} />
        </Switch>
      </div>
    )
  }
}
const mapStateToProps = ({licenseList}) => {
  return {
    licenseList
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchLicense
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Company)
