import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ListForm from './lists'
import addForm from './add'
import {connect} from 'react-redux'
import EditForm from './edit'
import {fetchLicense} from '../../redux/licenses/actions'
import { bindActionCreators } from 'redux'
class Users extends React.Component {
  componentDidMount () {
    this.props.fetchLicense()
  }
  shouldComponentUpdate (newProps) {
    return (newProps.licenseList.status === 'FETCHED')
  }
  render () {
    return (
      <div>
        <Switch>
          <Route path='/users' exact component={ListForm} />
          <Route path='/users/add' exact component={addForm} />
          <Route path='/users/edit/:accountId/:licenseId' exact component={EditForm} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Users)
