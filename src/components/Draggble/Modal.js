import React from 'react'
import PropTypes from 'prop-types'
// import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import Draggble from './List'

// const useStyles = makeStyles({
//   avatar: {
//     backgroundColor: blue[100],
//     color: blue[600],
//   },
// })

function SimpleDialog(props) {
  // const classes = useStyles()
  const {
    onClose, open, contents, onUpdate
  } = props

  const [items, setItems] = React.useState(contents)

  const handleClose = () => {
    onClose(false)
    onUpdate(items)
  }

  const onDragble = (newOrder) => {
    setItems(newOrder)
  }

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="simple-dialog-title">Draggble these blocks for order</DialogTitle>
      <DialogContent>
        <Draggble
          contents={contents}
          onDragble={onDragble}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          autoFocus
        >
          Cancel
        </Button>
        <Button
          onClick={handleClose}
          color="primary"
          autoFocus
        >
          Okey
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  contents: PropTypes.array.isRequired,
}

export default function SimpleDialogDemo({ contents, onUpdate }) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Set order of records
      </Button>
      <SimpleDialog
        contents={contents}
        open={open}
        onUpdate={onUpdate}
        onClose={handleClose}
        onCancel={handleCancel}
      />
    </div>
  )
}
