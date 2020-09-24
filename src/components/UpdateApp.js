import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

export default function SimpleSnackbar({ isOpen, handleClose }) {
  return (

    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isOpen}
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
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
        )}
    />
  )
}
