import React from 'react'
import { useDispatch, useSelector } from 'src/store/hooks'
import { useSnackbar } from 'notistack'
import { removeSnackbar, EnqueSnackbarType } from 'src/slices/alert'
import Grow from '@material-ui/core/Grow'

let displayed: any[] = []

const Notifier = (): null => {
  const dispatch = useDispatch()
  const notifications = useSelector((store) => store.alert.notifications)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar() // INFO FOR SHOW Snackbar on site

  const storeDisplayed = (id: any) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id: React.ReactText) => {
    displayed = [...displayed.filter((key) => id !== key)]
  }

  React.useEffect(() => {
    notifications.forEach(({
      key, message, options, dismissed = false
    }: EnqueSnackbarType) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key)
        return
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        // @ts-ignore
        TransitionComponent: Grow,
        ...options,
        // classes: {
        //   variantError: {
        //     backgroundColor: 'black'
        //   }
        // },
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey)
          }
        },
        onExited: (event, myKey) => {
          // removen this snackbar from redux store
          dispatch(removeSnackbar(myKey))
          removeDisplayed(myKey)
        },
      })

      // keep track of snackbars that we've displayed
      storeDisplayed(key)
    })
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])

  return null
}

export default Notifier
