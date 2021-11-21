import React, { useState } from "react"

const AddUserForm = (props) => {
  const initialUser = {id: null, name: "", username: ""}
  const [user, setUser] = useState(initialUser)

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setUser({...user, [name]: value})
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (!user.name || !user.username) return
    props.addUser(user)
    setUser(initialUser)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange}/>
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange}/>
      <button>Add</button>
    </form>
  )
}

export default AddUserForm