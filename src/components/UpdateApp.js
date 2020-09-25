import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { useSelector } from 'react-redux'

export default function SimpleSnackbar() {
  const { serviceWorkerUpdated, serviceWorkerRegistration } = useSelector((state) => state.sWorker)

  const updateServiceWorker = () => {
    const registrationWaiting = serviceWorkerRegistration.waiting
    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' })
      registrationWaiting.addEventListener('statechange', (e) => {
        if (e.target.state === 'activated') {
          localStorage.setItem('serviceWorkerUpdated', false)
          window.location.reload()
        }
      })
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    updateServiceWorker()
  }

  return (

    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={serviceWorkerUpdated || localStorage.getItem('serviceWorkerUpdated')}
      // autoHideDuration={95000}
      onClose={handleClose}
      message="Available new version"
      action={(
        <>
          <Button
            color="secondary"
            size="small"
            onClick={handleClose}
          >
            Update
          </Button>
        </>
        )}
    />
  )
}
