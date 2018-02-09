import React from 'react'
import PrivateRoute from '../utils/PrivateRouter'
import {Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import LoginForm from './login'
import Main from './main'
import Toast from '../utils/Toast'
import {verifyAdmin} from '../redux/authentication/actions'
// import {VERIFY_ADMIN_SUCCESS, VERIFY_ADMIN_FAILED} from '../redux/authentication/constants'
class Wrapper extends React.Component {
  handleVerifyAdminResponse ({userAuth}) {
    if (userAuth.status !== this.props.userAuth) {
      if (userAuth.status === 'VERIFIED') {
        console.log('SUCCESSFULLY VERIFEIED')
      } else if (userAuth.status === 'VERIFY_FAILED') {
        console.log('FAILE TO VERIFY...')
      }
    }
  }
  componentDidMount () {
    this.props.verifyAdmin()
  }
  componentWillReceiveProps (newProps) {
    this.handleVerifyAdminResponse(newProps)
  }
  shouldComponentUpdate (newProps) {
    return true
  }
  render () {
    return (
      <div>
        <Switch>
          <PrivateRoute path='/login' exact component={LoginForm} needAuthed={false} isAuthed={false} redirectTo={'/'} />
          <PrivateRoute path='/' component={Main} needAuthed={false} isAuthed={false} redirectTo={'/login'} />
          {/* <Route to='/' component={Main} /> */}
          {/* <Route to='/login' component={LoginForm} /> */}
          {/* <Redirect to='/login' /> */}
        </Switch>
        <Toast />
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
    verifyAdmin
  }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper))
