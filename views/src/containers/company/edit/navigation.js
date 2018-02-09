import React from 'react'
import {Link} from 'react-router-dom'
export default ({licenseId}) => {
  return (
    <div>
      <ul>
        <li><Link to={`/company/edit/${licenseId}`}>General</Link></li>
        <li><Link to={`/company/edit/${licenseId}/brandedsms`}>BrandedSMS</Link></li>
        <li><Link to={`/company/edit/${licenseId}/members`}>Members</Link></li>
      </ul>
    </div>
  )
}
