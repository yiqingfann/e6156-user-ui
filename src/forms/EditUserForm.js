import React, { useEffect, useState } from "react"

const EditUserForm = (props) => {
  useEffect(() => {setUser(props.editingUser)}, [props])
  
  const [user, setUser] = useState(props.editingUser)

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setUser({...user, [name]: value})
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (!user.first_name || !user.last_name || !user.email) return
    props.updateUser(user)
  }

  const handleCancel = (event) => {
    props.setIsEditing(false)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>First Name</label>
      <input type="text" name="first_name" value={user.first_name} onChange={handleInputChange}/>
      <label>Last Name</label>
      <input type="text" name="last_name" value={user.last_name} onChange={handleInputChange}/>
      <label>Email</label>
      <input type="text" name="email" value={user.email} onChange={handleInputChange}/>
      <button>Update</button>
      <button onClick={handleCancel} className="button muted-button">Cancel</button>
    </form>
  )
}

export default EditUserForm