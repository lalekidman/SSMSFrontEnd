import React from 'react'
import adminLogo from '../images/admin-logo.png'
import adminLogoDark from '../images/admin-logo-dark.png'
import adminText from '../images/admin-text.png'
import adminTextDark from '../images/admin-text-dark.png'
import UserImage from '../images/users/varun.jpg'
export default () => {
  return (
    <nav className='navbar navbar-default navbar-static-top m-b-0'>
      <div className='navbar-header'>
        <div className='top-left-part'>
          <a className='logo' href='index.html'>
            <b>
              <img src={adminLogo} alt='home' className='dark-logo' />
              <img src={adminLogoDark} alt='home' className='light-logo' />
            </b>
            <span className='hidden-xs'>
              <img src={adminText} alt='home' className='dark-logo' />
              <img src={adminTextDark} alt='home' className='light-logo' />
            </span>
          </a>
        </div>
        <ul className='nav navbar-top-links navbar-right pull-right'>
          <li>
            <form role='search' className='app-search hidden-sm hidden-xs m-r-10'>
              <input type='text' placeholder='Search...' className='form-control' /> <a href=''><i className='fa fa-search' /></a> </form>
          </li>
          <li>
            <a className='profile-pic' href='#'> <img src={UserImage} alt='user-img' width='36' className='img-circle' /><b className='hidden-xs'>Steave</b></a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
