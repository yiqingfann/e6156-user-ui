import React, { useState } from "react"
import UserTable from "./tables/UserTable"
import AddUserForm from "./forms/AddUserForm"
import EditUserForm from "./forms/EditUserForm"

const App = () => {
  const initialUsers = [
    {id: 1, name: 'Frank Fan', username: 'frankfan'},
    {id: 2, name: 'A Zi', username: 'azi'},
    {id: 3, name: 'Nana Mi', username: 'nanami'}
  ]
  const [users, setUsers] = useState(initialUsers)

  const [isEditing, setIsEditing] = useState(false)

  const initialEditingUser = {id: null, name: "", username: ""}
  const [editingUser, setEditingUser] = useState(initialEditingUser)

  const addUser = (user) => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const editUser = (user) => {
    setEditingUser(user)
    setIsEditing(true)
  }

  const updateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id == updatedUser.id ? updatedUser : user)))
    setIsEditing(false)
  }

  const deleteUser = (id) => {
    setIsEditing(false)
    const newUsers = users.filter((user) => {
      return user.id != id
    })
    setUsers(newUsers)
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {
            isEditing ? 
            (
              <div>
                <h2>Edit user</h2>
                <EditUserForm 
                  editingUser={editingUser}
                  updateUser={updateUser}
                  setIsEditing={setIsEditing}
                />
              </div>
            ) 
            : 
            (
              <div>
                <h2>Add user</h2>
                <AddUserForm addUser={addUser}/>
              </div>
            )
          }
          
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editUser={editUser} deleteUser={deleteUser}/>
        </div>
      </div>
    </div>
  )
}

export default App;
