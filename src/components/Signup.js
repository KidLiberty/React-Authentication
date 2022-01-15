import React, { useState, useRef } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (
      passwordRef.current.value.length < 6 ||
      passwordConfirmRef.current.value.length < 6
    ) {
      return setError('Passwords must be at least 6 characters long.')
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match.')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                className='mb-1'
                ref={emailRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                className='mb-1'
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control
                type='password'
                className='mb-4'
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Login</Link>
      </div>
    </>
  )
}
