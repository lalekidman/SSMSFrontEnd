import React from 'react'
const MemberList = (props) => {
  return (
    <div>
      <h3>USERS ON THE COMPANY</h3>
      <div className='table-scroll'>
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Remove</th>
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
export default (MemberList)
