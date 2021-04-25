/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import {
  Dialog, ListItemText, ListItem, IconButton,
  DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'

import {
  getCategoryRequest, deleteCategoryItem, deleteWord, wordIdType
} from 'src/slices/dictionary'
import { useDispatch, useSelector } from 'src/store/hooks'
import LoadingScreen from 'src/components/LoadingScreen'
import CloseIcon from '@material-ui/icons/Close'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import { useTranslation } from 'react-i18next'
import DOMPurify from 'dompurify'
import { useHistory, useLocation } from 'react-router-dom'
import { useNotification } from 'src/hooks/useNotification'
import { useStyles } from './stylesModal'

import TitleCategoryDict from './TitleCategoryDict'

export const ShowCategoryModal = (): any => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const history = useHistory()
  const location = useLocation()
  const notify = useNotification()

  const { category, loading } = useSelector((store) => store.dictionary.item)

  const { state } = location

  const onCLose = () => {
    // @ts-ignore
    history.goBack()
  }

  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe)
      notify({ message: t('dict.word was copied') })
    } catch (err) {
      notify({ message: t('dict.word was not copied') })
    }
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
              <div className={classes.wordTitle}>
                {word.title}
              </div>
              <div
                className={classes.wordContent}
                dangerouslySetInnerHTML={{ __html: clean }}
              />
            </div>
            <div className={classes.wordViewButtons}>
              <IconButton
                color="inherit"
                onClick={() => copyToClipBoard(word.title)}
              >
                <FilterNoneIcon />
              </IconButton>
              <IconButton
                className={classes.wordDeleteIcon}
                color="inherit"
                onClick={() => onDeleteWord(word._id)}
              >
                <CloseIcon />
              </IconButton>
            </div>
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
      <DialogTitle>
        {!loading && category?.title && category._id ? (
          <TitleCategoryDict
            id={category._id}
            value={category?.title}
          />
        ) : '...'}

      </DialogTitle>
      <DialogContent className={classes.dialogContentShowCategory}>
        {
          loading ? <LoadingScreen /> : <Words />
        }
      </DialogContent>
      <DialogActions className={classes.dialogActionsShowCategory}>
        <ListItem
          button
          className={classes.closeCategoryButton}
          onClick={onCLose}
        >
          <ListItemText primary={t('btn.close')} />
        </ListItem>
        <ListItem
          button
          onClick={onDeleteCategory}
        >
          <ListItemText primary={t('dict.delete this category')} />
        </ListItem>
      </DialogActions>
    </Dialog>
  )
}

export default ShowCategoryModal
