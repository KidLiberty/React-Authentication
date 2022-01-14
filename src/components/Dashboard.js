import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Button, Alert } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout(e) {
    setError('')

    try {
      await logout()
    } catch {
      setError('Failed to logout')
      navigate('/login')
    }
  }

  return (
    <>
      <h1 className='text-center mb-4'>Profile Page :D</h1>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Welcome!</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button varian='link' onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}
