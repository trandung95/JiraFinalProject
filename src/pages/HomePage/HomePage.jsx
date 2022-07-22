import React from 'react'
import { useSelector } from 'react-redux'

export default function HomePage(props) {
  const userLogin = useSelector(state => state.logInReducer.userLogin)
  return (
    <div>
      <h2>Home page</h2>
      <img src={userLogin.avatar} alt="avatar" />
      <p>{userLogin.name}</p>
      <p>{userLogin.phoneNumber}</p>
      <p>{userLogin.email}</p>
    </div>
  )
}
