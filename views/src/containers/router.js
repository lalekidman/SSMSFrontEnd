import React from 'react'
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom'
import PrivateRoute from '../utils/PrivateRouter'
import Dashboard from './dashboard'
export default () => {
  return (
    <Switch>
      <Route path={'/'} exact component={Dashboard} />
      <Route path={'/dashboard'} exact component={Dashboard} />
    </Switch>
  )
}
