// or get from process.env.REACT_APP_{var} to handle PROD and DEV environments
export const APP_VERSION = '0.11.0'

export const APP_NAME = 'Arabic\' Practice App'

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

export const HOST = process.env.NODE_ENV === 'production'
  ? 'https://madinah.best' // for local docker-compose use variable "http://localhost" instead this
  : 'http://localhost:5000'

export const API_BASE_URL = `${HOST}/api/v1`
export const UPLOADS_URL = `${HOST}/uploads`

export const ENABLE_REDUX_LOGGER = false

export const DEBUG_I18 = false // process.env.NODE_ENV === 'development' // for deb

export const LEVELS = [
  'beginner',
  'elementary',
  'preintermediate',
  'intermediate',
  'upperintermediate'
]

export const LANGUAGES = [
  'ar',
  'en',
  'ru',
]

export const DEFAULT_LANGUAGE = LANGUAGES.find(
  (lang) => navigator.language.match(lang)
) || 'en' // navigator.language - "en-US"

/**
 * Маршрут авторихации который будет обрабатываться специальным образом
 * так как есть некоторые ньюансы для этого маршрута
 *
 * все дело в service-worker которы обрабатыва
 * window.open(URL) не так как нужно мне
 */
export const routeAuthSocial = '/api/v1/auth/social'

/**
 * another component load
 */
export const alphabetProgramId = process.env.NODE_ENV === 'development'
  ? '605fc7fd629d9301d8c07bb2'
  : '605bd1cea7b7090013b9160b'
