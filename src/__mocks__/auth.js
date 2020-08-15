import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import mock from 'src/utils/mock'
import wait from 'src/utils/wait'
import { API_BASE_URL } from 'src/constants'

const JWT_SECRET = 'devias-top-secret-key'
const JWT_EXPIRES_IN = '2 days'

const users = [
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/static/images/calligraphy/calligraphy4.jpg',
    canHire: false,
    country: 'Saudi Arabia',
    email: 'test@gmail.com',
    isPublic: true,
    name: 'Test Testov',
    password: '123456',
    phone: '+1 234 456 7890',
    role: 'admin',
    state: 'Madinah'
  }
]

mock.onPost(`${API_BASE_URL}/auth/login`).reply(async (config) => {
  try {
    await wait(1000)

    const { email, password } = JSON.parse(config.data)
    const user = users.find((_user) => _user.email === email)

    if (!user) {
      return [400, { message: 'Please check your email and password' }]
    }

    if (user.password !== password) {
      return [400, { message: 'Invalid password' }]
    }

    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    return [200, {
      token,
      user: {
        id: user.id,
        avatar: user.avatar,
        email: user.email,
        name: user.name
      }
    }]
  } catch (err) {
    console.error(err)
    return [500, { message: 'Internal server error' }]
  }
})

mock.onPost(`${API_BASE_URL}/auth/register`).reply(async (config) => {
  try {
    await wait(1000)

    const { email, name, password } = JSON.parse(config.data)
    let user = users.find((_user) => _user.email === email)

    if (user) {
      return [400, { message: 'User already exists' }]
    }

    user = {
      id: uuidv4(),
      avatar: null,
      canHire: false,
      country: null,
      email,
      isPublic: true,
      name,
      password,
      phone: null,
      role: 'admin',
      state: null
    }

    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    return [200, {
      token,
      user: {
        id: user.id,
        avatar: user.avatar,
        email: user.email,
        name: user.name
      }
    }]
  } catch (err) {
    console.error(err)
    return [500, { message: 'Internal server error' }]
  }
})

mock.onGet(`${API_BASE_URL}/auth/me`).reply((config) => {
  try {
    const { Authorization } = config.headers

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }]
    }

    const token = Authorization.split(' ')[1]
    const { userId } = jwt.verify(token, JWT_SECRET)
    const user = users.find((_user) => _user.id === userId)

    if (!user) {
      return [401, { message: 'Invalid authorization token' }]
    }

    return [200, {
      user: {
        id: user.id,
        avatar: user.avatar,
        email: user.email,
        name: user.name
      }
    }]
  } catch (err) {
    console.error(err)
    return [500, { message: 'Internal server error' }]
  }
})

// mock.onGet('/api/account/settings').reply(200, {
//   settings: {}
// })

// mock.onGet('/api/account/subscription').reply(200, {
//   subscription: {
//     name: 'Premium',
//     price: 29,
//     currency: '$',
//     proposalsLeft: 12,
//     templatesLeft: 5,
//     invitesLeft: 24,
//     adsLeft: 10,
//     hasAnalytics: true,
//     hasEmailAlerts: true
//   }
// })
