import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase'

export const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    // Firebase method when called will return a method that unsubscribes this event
    return unsubscribe
  }, [])

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const value = {
    currentUser,
    signup
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
