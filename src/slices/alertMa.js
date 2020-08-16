export const module = 'snackbar'

export const ENQUEUE_SNACKBAR = `${module}/ENQUEUE_SNACKBAR`
export const CLOSE_SNACKBAR = `${module}/CLOSE_SNACKBAR`
export const REMOVE_SNACKBAR = `${module}/REMOVE_SNACKBAR`


const initialState = {
  notifications: [],
}
/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      }

    case CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) => (
          (action.dismissAll || notification.key === action.key)
            ? { ...notification, dismissed: true }
            : { ...notification }
        )),
      }

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key,
        ),
      }

    default:
      return state
  }
}
/**
 * ACTIONS
 */
export const enqueueSnackbar = (notification) => {
  const key = notification.options && notification.options.key
  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  }
}

export const closeSnackbar = (key) => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
})

export const removeSnackbar = (key) => ({ type: REMOVE_SNACKBAR, key })
