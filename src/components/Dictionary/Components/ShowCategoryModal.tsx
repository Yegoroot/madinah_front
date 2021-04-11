/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import {
  Dialog, ListItemText, ListItem, IconButton
} from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { getCategoryRequest, deleteCategoryItem } from 'src/slices/dictionary'
import { useDispatch, useSelector } from 'src/store/hooks'
import LoadingScreen from 'src/components/LoadingScreen'
import CloseIcon from '@material-ui/icons/Close'
import { useTranslation } from 'react-i18next'
import DOMPurify from 'dompurify'
import { useStyles } from './stylesModal'

export const ShowCategoryModal = ({ categoryId, onClose }: { categoryId: string, onClose: any}): any => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { category, loading } = useSelector((store) => store.dictionary.item)

  const onDelete = () => {
    if (window.confirm(t('alert.do you want to delete this category'))) {
      dispatch(deleteCategoryItem(categoryId))
      onClose()
    }
  }

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryRequest(categoryId))
    }
  }, [dispatch, categoryId])

  const Words = () => (
    <>
      {category?.words.map((word) => {
        const clean = word.content ? DOMPurify.sanitize(word.content) : ''
        return (
          <p
            className={classes.cardWord}
            key={word._id}
          >
            <div>
              {word.title}
            </div>
            <div className={classes.wordContent}>
              <div dangerouslySetInnerHTML={{ __html: clean }} />
            </div>
          </p>
        )
      })}
    </>
  )

  console.log(categoryId)
  return (
    <Dialog
      open={!!categoryId}
      onClose={onClose}
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
        {/* <h1> */}
        {category?.title}
        {/* </h1> */}
        <IconButton
          className={classes.closeIcon}
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {
          loading ? <LoadingScreen /> : <Words />
        }
      </DialogContent>
      <DialogActions className={classes.dialogActionsShowCategory}>
        <ListItem
          button
          onClick={onClose}
        >
          <ListItemText primary=" Close" />
        </ListItem>
        <ListItem
          button
          onClick={onDelete}
        >
          <ListItemText primary="Delete this category" />
        </ListItem>
      </DialogActions>
    </Dialog>
  )
}

export default ShowCategoryModal
