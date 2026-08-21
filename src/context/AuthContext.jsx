import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('makeup-store-user')
    setUser(savedUser ? JSON.parse(savedUser) : null)
    setLoading(false)
  }, [])

  const signUp = async (email, password) => {
    const users = JSON.parse(localStorage.getItem('makeup-store-users') || '{}')
    if (users[email]) throw new Error('An account with this email already exists')
    users[email] = { email, password }
    localStorage.setItem('makeup-store-users', JSON.stringify(users))
    const newUser = { id: email, email }
    localStorage.setItem('makeup-store-user', JSON.stringify(newUser))
    setUser(newUser)
    return { user: newUser }
  }

  const signIn = async (email, password) => {
    const users = JSON.parse(localStorage.getItem('makeup-store-users') || '{}')
    if (!users[email] || users[email].password !== password) throw new Error('Invalid email or password')
    const signedInUser = { id: email, email }
    localStorage.setItem('makeup-store-user', JSON.stringify(signedInUser))
    setUser(signedInUser)
    return { user: signedInUser }
  }

  const signOut = async () => {
    localStorage.removeItem('makeup-store-user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
