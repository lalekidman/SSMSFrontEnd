import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {black} from 'material-ui/styles/colors'
import Main from './containers'
import {BrowserRouter} from 'react-router-dom'
getMuiTheme({
  palette: {
    textColor: black
  },
  appBar: {
    height: 50
  }
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
