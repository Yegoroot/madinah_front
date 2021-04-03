/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import {  useEffect } from 'react'
import { useSnackbar } from 'notistack'
import Grow from '@material-ui/core/Grow'

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar()

  return ({ message, variant }: {message: String, variant?: any}) => enqueueSnackbar(message, {
    autoHideDuration: 4000,
    variant,
    // @ts-ignore
    TransitionComponent: Grow,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    }
  })
}

export default useNotification
