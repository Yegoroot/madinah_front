/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {
  DialogTitle, DialogContent, DialogActions, SvgIcon
} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import { AlignLeft } from 'react-feather'
import { useTranslation } from 'react-i18next'
import Draggble from './List'

const useStyles = makeStyles((theme) => ({
  // dynamic name
  topics: {
    marginTop: 8,
  },
  dialogContent: {
    padding: '20px 0px !important'
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  },
}))

function SimpleDialog(props) {
  const classes = useStyles()
  const {
    onClose, open, contents, onUpdate, type
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
      <DialogTitle
        id="simple-dialog-title"
      >
        Draggble these blocks for order
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Draggble
          type={type}
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

export default function SimpleDialogDemo({ contents, onUpdate, type }) {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  const { t } = useTranslation()
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant={type === 'topics' ? 'contained' : 'outlined'}
        className={classes[type]}
        color="primary"
        onClick={handleClickOpen}
      >
        <SvgIcon
          fontSize="small"
          className={classes.actionIcon}
        >
          <AlignLeft />
        </SvgIcon>
        {type === 'topics'
          ? t('pageProgram.set order of topics')
          : t('pageProgram.set order of records')}
      </Button>
      <SimpleDialog
        type={type}
        contents={contents}
        open={open}
        onUpdate={onUpdate}
        onClose={handleClose}
      />
    </div>
  )
}
