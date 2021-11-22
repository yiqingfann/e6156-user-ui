import React, { useState } from "react"

const AddUserForm = (props) => {
  const initialUser = {first_name: "", last_name: "", email: ""}
  const [user, setUser] = useState(initialUser)

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setUser({...user, [name]: value})
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (!user.first_name || !user.last_name || !user.email) return
    props.addUser(user)
    setUser(initialUser)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>First Name</label>
      <input type="text" name="first_name" value={user.first_name} onChange={handleInputChange}/>
      <label>Last Name</label>
      <input type="text" name="last_name" value={user.last_name} onChange={handleInputChange}/>
      <label>Email</label>
      <input type="text" name="email" value={user.email} onChange={handleInputChange}/>
      <button>Add</button>
    </form>
  )
}

export default AddUserForm