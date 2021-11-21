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
    if (!user.name || !user.username) return
    props.updateUser(user)
  }

  const handleCancel = (event) => {
    props.setIsEditing(false)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange}/>
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange}/>
      <button>Update</button>
      <button onClick={handleCancel} className="button muted-button">Cancel</button>
    </form>
  )
}

export default EditUserForm