import React, { useEffect, useState } from "react"
import UserTable from "./tables/UserTable"
import AddUserForm from "./forms/AddUserForm"
import EditUserForm from "./forms/EditUserForm"

const App = () => {

  const retrieveUsers = () => {
    const url = "http://localhost:5000/users"
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      setUsers(response)
    })
  }

  // equivalant to componentDidMount()
  useEffect(retrieveUsers, [])

  const initialUsers = [
    {user_id: 1, first_name: 'Frank', last_name: 'Fan', email: 'frankfan@columbia.edu'},
    {user_id: 2, first_name: 'A', last_name: 'Zi', email: 'azi@bilibili.com'},
  ]
  const [users, setUsers] = useState(initialUsers)

  const [isEditing, setIsEditing] = useState(false)

  const initialEditingUser = {user_id: null, first_name: "", last_name: "", email: ""}
  const [editingUser, setEditingUser] = useState(initialEditingUser)

  const addUser = (user) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    fetch("http://localhost:5000/users", requestOptions)
        .then((response) => {
          const locationURL = response.headers.get('Location')
          user.user_id = locationURL.substr(locationURL.lastIndexOf('/')+1)
          setUsers([...users, user])
        })
    // setUsers([...users, user]) // QUESTION: if put here, table unique key error
  }

  const editUser = (user) => {
    setEditingUser(user)
    setIsEditing(true)
  }

  const updateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.user_id == updatedUser.user_id ? updatedUser : user)))
    setIsEditing(false)
  }

  const deleteUser = (user_id) => {
    setIsEditing(false)
    const newUsers = users.filter((user) => {
      return user.user_id != user_id
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
