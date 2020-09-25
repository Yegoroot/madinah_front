import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { useSelector, useDispatch } from 'react-redux'

export default function SimpleSnackbar() {
  const dispatch = useDispatch()
  const { isNewVersionServiceWorker, onUpdateServiceWorker } = useSelector((state) => state.sWorker)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(onUpdateServiceWorker())
  }
  console.log('UpdateApp.js isNewVersionServiceWorker REDUX', isNewVersionServiceWorker)
  console.log('UpdateApp.js isNewVersionServiceWorker STORAGE', !!localStorage.getItem('isNewVersionServiceWorker'))
  return (

    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isNewVersionServiceWorker || !!localStorage.getItem('isNewVersionServiceWorker')}
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
