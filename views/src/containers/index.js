import React from 'react'
import TopNavigation from './topNavigation'
import LeftNavigation from './leftNavigation'
import Router from './router'
class Main extends React.Component {
  render () {
    return (
      <div>
        {/* <div className='preloader'>
          <svg className='circular' viewBox='25 25 50 50'>
            <circle className='path' cx='50' cy='50' r='20' fill='none' stroke-width='2' stroke-miterlimit='10' />
          </svg>
        </div> */}
        <TopNavigation />
        <LeftNavigation />
        <Router />
      </div>
    )
  }
}

export default Main
