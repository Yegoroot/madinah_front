/* eslint-disable react/prop-types */
import React, {
  createContext,
  useEffect,
  useReducer
} from 'react'
import jwtDecode from 'jwt-decode'
import SplashScreen from 'src/components/SplashScreen'
// import axios from 'src/utils/axios'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
}

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false
  }

  const decoded = jwtDecode(accessToken)
  const currentTime = Date.now() / 1000

  return decoded.exp > currentTime
}

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common.Authorization
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, user } = action.payload

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      }
    }
    case 'LOGIN': {
      const { user } = action.payload

      return {
        ...state,
        isAuthenticated: true,
        user
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    }
    case 'REGISTER': {
      const { user } = action.payload

      return {
        ...state,
        isAuthenticated: true,
        user
      }
    }
    default: {
      return { ...state }
    }
  }
}

const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  login: () => Promise.resolve(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => { },
  register: () => Promise.resolve()
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState)

  const login = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password })
    const { token, user } = response.data

    setSession(token)
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    })
  }

  const logout = () => {
    setSession(null)
    dispatch({ type: 'LOGOUT' })
  }

  const register = async (email, name, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      email,
      name,
      password
    })
    const { token, user } = response.data

    window.localStorage.setItem('accessToken', token)

    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    })
  }

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')

        // LOGOUT FOR UNAUTH USER
        // axios.interceptors.response.use(
        //   (response) => response,
        //   (error) => {
        //     if (error.response && error.response.status === 401) {
        //       logout(null)
        //     }
        //     return Promise.reject(error)
        //   }
        // )

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken)

          const response = await axios.get(`${API_BASE_URL}/auth/me`)
          const { user } = response.data

          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: true,
              user
            }
          })
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          })
        }
      } catch (err) {
        console.error('err', err)
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        })
      }
    }

    initialise()
  }, [])

  if (!state.isInitialised) {
    return <SplashScreen />
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
