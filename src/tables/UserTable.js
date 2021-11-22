import React from "react"

const UserTable = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { props.users.length > 0 ?
          (
            props.users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <button 
                    onClick={() => {props.editUser(user)}}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => {props.deleteUser(user.user_id)}}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )
          :
          (
            <tr>
              <td colSpan={3}>No User</td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

export default UserTable