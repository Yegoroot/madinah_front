/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import {
  Dialog, ListItemText, ListItem, IconButton
} from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  getCategoryRequest, deleteCategoryItem, deleteWord, wordIdType
} from 'src/slices/dictionary'
import { useDispatch, useSelector } from 'src/store/hooks'
import LoadingScreen from 'src/components/LoadingScreen'
import CloseIcon from '@material-ui/icons/Close'
import { useTranslation } from 'react-i18next'
import DOMPurify from 'dompurify'
import { useHistory, useLocation } from 'react-router-dom'
import { useStyles } from './stylesModal'

export const ShowCategoryModal = (): any => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const history = useHistory()
  const location = useLocation()

  const { category, loading } = useSelector((store) => store.dictionary.item)

  const { state } = location

  const onCLose = () => {
    // @ts-ignore
    history.goBack()
  }

  const onDeleteCategory = () => {
    if (window.confirm(t('alert.do you want to delete this category'))) {
      dispatch(deleteCategoryItem(state.categoryId))
      onCLose()
    }
  }

  const onDeleteWord = (id: wordIdType | undefined) => {
    if (id) {
      if (window.confirm(t('alert.do you want to delete this word'))) {
        dispatch(deleteWord(id))
      }
    }
  }

  useEffect(() => {
    if (state && state.categoryId) {
      dispatch(getCategoryRequest(state.categoryId))
    }
  }, [dispatch, state])

  if (!state || !state.categoryId) return null

  const Words = () => (
    <>
      {category?.words.map((word) => {
        const clean = word.content ? DOMPurify.sanitize(word.content) : ''
        return (
          <div
            className={classes.cardWord}
            key={word._id}
          >
            <div>
              <div>
                {word.title}
              </div>
              <div className={classes.wordContent}>
                <div dangerouslySetInnerHTML={{ __html: clean }} />
              </div>
            </div>
            <IconButton
              className={classes.closeIcon}
              color="inherit"
              onClick={() => onDeleteWord(word._id)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        )
      })}
    </>
  )

  return (
    <Dialog
      open={!!state.categoryId}
      onClose={onCLose}
      fullScreen
      fullWidth
      maxWidth="lg"
      aria-labelledby="modalShowCategory"
    >
      <DialogTitle
        id="modalShowCategory"
        disableTypography
        className={classes.dialogTitle}
      >
        {loading ? '...' : category?.title}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {
          loading ? <LoadingScreen /> : <Words />
        }
      </DialogContent>
      <DialogActions className={classes.dialogActionsShowCategory}>
        <ListItem
          button
          onClick={onCLose}
        >
          <ListItemText primary=" Close" />
        </ListItem>
        <ListItem
          button
          onClick={onDeleteCategory}
        >
          <ListItemText primary="Delete this category" />
        </ListItem>
      </DialogActions>
    </Dialog>
  )
}

export default ShowCategoryModal
