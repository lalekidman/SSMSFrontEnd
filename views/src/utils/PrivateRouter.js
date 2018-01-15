import React from 'react'
import {Route, Redirect} from 'react-router-dom'
const PrivateRouter = ({component: Component, isAuthed, needAuthed, fallback, ...rest}) => {
  return (<Route {...rest} render={props => {
    return (isAuthed === needAuthed)
      ? <Component {...props} />
      : <Redirect to={{pathname: fallback, state: {from: props.location}}} />
  }} />)
}
export default PrivateRouter
