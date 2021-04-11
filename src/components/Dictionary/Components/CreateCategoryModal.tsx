/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Dialog, } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useTranslation } from 'react-i18next'
import { createCategoryRequest } from 'src/slices/dictionary'
import { useDispatch, useSelector } from 'src/store/hooks'
import { useStyles } from './stylesModal'

export const CreateCategoryModal = ({ isOpen, onClose }: {isOpen: boolean, onClose: any}): any => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const dictionaryId = useSelector((store) => store.dictionary.list._id)

  const [title, setTitle] = useState('')

  const onSend = async () => {
    if (!title) return
    if (dictionaryId) {
      dispatch(createCategoryRequest({
        dictionary: dictionaryId,
        title,
        words: []
      }))
    }
    setTitle('')
    onClose()
  }

  const onkeydown = (e: any) => {
    if (e.key === 'Enter') {
      onSend()
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      onKeyDown={(e) => onkeydown(e)}
      classes={{ paper: classes.paper, }}
    >
      <DialogTitle
        disableTypography
        className={classes.dialogTitle}
      >
        {t('dict.create a new category')}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>
          {t('dict.for example countries')}

        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          onChange={(e) => setTitle(e.target.value)}
          label={t('dict.write a category name')}
          fullWidth
          value={title}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          onClick={onSend}
          color="primary"
        >
          {t('btn.add')}
        </Button>
        <Button
          onClick={onClose}
          color="inherit"
        >
          {t('btn.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateCategoryModal
