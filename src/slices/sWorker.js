/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // serviceWorkerInitialized: false,
  isNewVersionServiceWorker: JSON.parse(localStorage.getItem('isNewVersionServiceWorker')) || false,
  onRegistrationServiceWorker: null,
}

export const module = 'sWorker'

const slice = createSlice({
  name: module,
  initialState,
  reducers: {
    // initServiceWorker(sWorker) {
    //   sWorker.serviceWorkerInitialized = true
    // },

    onUpdateServiceWorker(sWorker) {
      localStorage.setItem('isNewVersionServiceWorker', false) // если пользователь случайно обновил page и не успел обновить app
      const registrationWaiting = sWorker.onRegistrationServiceWorker.waiting
      if (registrationWaiting) {
        registrationWaiting.postMessage({ type: 'SKIP_WAITING' })
        registrationWaiting.addEventListener('statechange', (e) => {
          if (e.target.state === 'activated') {
            window.location.reload()
          }
        })
      }
    },

    onCheckUpdateServiceWorker(sWorker, { payload }) {
      localStorage.setItem('isNewVersionServiceWorker', true) // если пользователь случайно обновил page и не успел обновить app
      const { registration } = payload
      console.log('reduce after callback', registration)
      sWorker.isNewVersionServiceWorker = true
      sWorker.onRegistrationServiceWorker = registration
    },
  },

})

export const { reducer } = slice

/**
 * Service Worker init
 */
// export const initServiceWorker = () => async (dispatch) => {
//   dispatch(slice.actions.initServiceWorker())
// }

/**
 * Service Worker trigger for update
 */
export const onCheckUpdateServiceWorker = (registration) => async (dispatch) => {
  dispatch(slice.actions.onCheckUpdateServiceWorker({ registration }))
}

/**
 * Service Worker update
 */
export const onUpdateServiceWorker = () => async (dispatch) => {
  dispatch(slice.actions.onUpdateServiceWorker())
}

export default slice
