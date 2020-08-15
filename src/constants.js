// or get from process.env.REACT_APP_{var} to handle PROD and DEV environments
export const APP_VERSION = '3.1.0'

export const ENABLE_REDUX_DEV_TOOLS = true

export const THEMES = {
  LIGHT: 'LIGHT',
  ONE_DARK: 'ONE_DARK',
  UNICORN: 'UNICORN'
}

// new
export const PROGRAMS_URL = '/app/programs'
export const DOMEN = 'http://localhost:5000'

export const API_BASE_URL = `${DOMEN}/api/v1`
export const IMAGES_BASE_URL = `${DOMEN}/uploads/images`

export const ENABLE_REDUX_LOGGER = false

export const DEBUG_I18 = false // for deb
export const DEFAULT_LANGUAGE = 'en'

export const CONTENT_TYPES = [
  {
    type: 'text',
    title: 'Текстовая запись'
  },
  {
    type: 'md',
    title: 'Markdown'
  },
  {
    type: 'audio',
    title: 'Аудио дорожка'
  }
]
