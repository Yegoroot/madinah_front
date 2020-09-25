/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  serviceWorkerInitialized: false,
  isNewVersionServiceWorker: false,
  onRegistrationServiceWorker: null,
}

export const module = 'sWorker'

const slice = createSlice({
  name: module,
  initialState,
  reducers: {
    initServiceWorker(sWorker) {
      sWorker.serviceWorkerInitialized = true
    },

    onUpdateServiceWorker(sWorker) {
      sWorker.isNewVersionServiceWorker = false
      const registrationWaiting = sWorker.onRegistrationServiceWorker
        ? sWorker.onRegistrationServiceWorker.waiting
        : localStorage.getItem('sw')
      if (registrationWaiting) {
        registrationWaiting.postMessage({ type: 'SKIP_WAITING' })
        registrationWaiting.addEventListener('statechange', (e) => {
          if (e.target.state === 'activated') {
            alert('activated')
            window.location.reload()
          }
          alert('not activated')
        })
      }
      alert('registrationWaiting not waiting')
    },

    onCheckUpdateServiceWorker(sWorker, { payload }) {
      const { registration } = payload
      console.log('New Registration Service Worker', registration)
      sWorker.isNewVersionServiceWorker = true
      sWorker.onRegistrationServiceWorker = registration
    },
  },

})

export const { reducer } = slice

/**
 * Service Worker init
 */
export const initServiceWorker = () => async (dispatch) => {
  dispatch(slice.actions.initServiceWorker())
}

/**
 * Service Worker trigger for update
 */
export const onCheckUpdateServiceWorker = (registration) => async (dispatch) => {
  localStorage.setItem('sw', registration)
  localStorage.setItem('isNewVersionServiceWorker', true) // если пользователь случайно обновил и не успел обновитьт
  dispatch(slice.actions.onCheckUpdateServiceWorker({ registration }))
}

/**
 * Service Worker update
 */
export const onUpdateServiceWorker = () => async (dispatch) => {
  localStorage.setItem('sw', null) // если пользователь случайно обновил и не успел обновитьт
  localStorage.setItem('isNewVersionServiceWorker', false) // если пользователь случайно обновил и не успел обновитьт
  dispatch(slice.actions.onUpdateServiceWorker())
}

export default slice
