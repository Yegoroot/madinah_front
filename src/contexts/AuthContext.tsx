/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  useEffect,
  useReducer
} from 'react'
import jwtDecode from 'jwt-decode'
import SplashScreen from 'src/components/SplashScreen'
import axios from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'

export type userType = {
  role: string,
  dictionary: any,
  _id: string
}

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
}

const isValidToken = (accessToken: any) => {
  if (!accessToken) {
    return false
  }

  const decoded = jwtDecode(accessToken)
  const currentTime = Date.now() / 1000
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Object is of type 'unknown'.
  return decoded.exp > currentTime
}

const setSession = (accessToken: any) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common.Authorization
  }
}

const reducer = (state: any, action: any) => {
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
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const AuthProvider = ({ children }: { children: any}) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState)

  // JWT auth
  const login = async (email: string, password: string) => {
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

  const logout = async () => {
    await axios.get(`${API_BASE_URL}/auth/logout`)
    setSession(null) // local storage null
    dispatch({ type: 'LOGOUT' })
  }

  const register = async (email: string, name: string, password: string) => {
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
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken)
        }

        // FIXME  Посмотреть по наблюдать, нормально ли работает данный подход в обычном использовании и проблемах
        // FIXME  Посмотреть по наблюдать, нормально ли работает данный подход в обычном использовании и проблемах
        // FIXME  Посмотреть по наблюдать, нормально ли работает данный подход в обычном использовании и проблемах
        // LOGOUT FOR UNAUTH USER
        // axios.interceptors.response.use(
        //   (response) => response,
        //   (error) => {
        //     if (error.response && error.response.status === 401) {
        //       logout()
        //     }
        //     return Promise.reject(error)
        //   }
        // )
        // FIXME  Посмотреть по наблюдать, нормально ли работает данный подход в обычном использовании и проблемах
        // FIXME  Посмотреть по наблюдать, нормально ли работает данный подход в обычном использовании и проблемах
        // FIXME  Посмотреть по наблюдать, нормально ли работает данный подход в обычном использовании и проблемах

        const response = await axios.get(`${API_BASE_URL}/auth/me`)
        const { user } = response.data
        console.log('Auth successful')
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: !!user,
            user
          }
        })
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
