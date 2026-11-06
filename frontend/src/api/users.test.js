import { beforeEach, test, expect, vi } from 'vitest'
import axios from 'axios'
import { registerUser, logUser } from './users'

vi.mock('axios', () => ({
  default: { post: vi.fn() }
}))

beforeEach(() => vi.resetAllMocks())

test('registerUser returns the mocked success response', async () => {
  const userData = {
    username: 'testuser',
    password: 'testpassword'
  }
  axios.post.mockResolvedValue({ data: { message: 'Usuario registrado exitosamente' } })

  const response = await registerUser(userData)
  expect(response).toHaveProperty('message', 'Usuario registrado exitosamente')
  expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/register', userData)
})

test('logUser returns the mocked token response', async () => {
  const credentials = {
    username: 'testuser',
    password: 'testpassword'
  }
  axios.post.mockResolvedValue({ data: { token: 'mock-jwt-token' } })

  const response = await logUser(credentials)
  expect(response).toHaveProperty('token', 'mock-jwt-token')
  expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/login', credentials)
})