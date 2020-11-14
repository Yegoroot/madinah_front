import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { useSelector, useDispatch } from 'react-redux'
import { onUpdateServiceWorker, module } from 'src/slices/sWorker'
import { useTranslation } from 'react-i18next'

export default function SimpleSnackbar() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { isNewVersionServiceWorker } = useSelector((state) => state[module])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(onUpdateServiceWorker())
  }

  // console.log('redux: ', isNewVersionServiceWorker, 'storage parse: ', JSON.parse(localStorage.getItem('isNewVersionServiceWorker')))

  // window.addEventListener('beforeunload', (e) => {
  //   // the absence of a returnValue property on the event will guarantee the browser unload happens
  //   dispatch(onUpdateServiceWorker())
  //   console.log('asd')
  //   // delete e.returnValue
  // })

  return (

    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isNewVersionServiceWorker}
      // autoHideDuration={95000}
      onClose={handleClose}
      message={t('notify.app was update')}
      action={(
        <>
          <Button
            color="secondary"
            size="small"
            onClick={handleClose}
          >
            {t('notify.update')}
          </Button>
        </>
              )}
    />
  )
}
