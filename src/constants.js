// or get from process.env.REACT_APP_{var} to handle PROD and DEV environments
export const APP_VERSION = '1.0.0'

export const APP_NAME = 'Al Jamia of Self Stady'

export const ENABLE_REDUX_DEV_TOOLS = true

export const THEMES = {
  LIGHT: 'LIGHT',
  ONE_DARK: 'ONE_DARK',
  // UNICORN: 'UNICORN'
}

// new
export const PUBLIC_PROGRAMS_URL = '/programs'
export const PROGRAMS_URL = '/app/programs'
export const TOPICS_URL = '/app/topics'
export const USERS_URL = '/app/users'
export const TYPES_URL = '/app/types'

export const DOMEN = 'madinah.best'

export const HOST = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:5000'

export const API_BASE_URL = `${HOST}/api/v1`
export const IMAGES_BASE_URL = `${HOST}/uploads/images`

export const ENABLE_REDUX_LOGGER = false

export const DEBUG_I18 = false // for deb
export const DEFAULT_LANGUAGE = 'en'
