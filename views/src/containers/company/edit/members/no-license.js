import React from 'react'
const UserWithoutLicense = (props) => {
  return (
    <div>
      <h4>Without License</h4>
      <div className='table-scroll'>
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {props.lists}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default UserWithoutLicense
