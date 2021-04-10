/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import {
  Dialog, ListItemText, ListItem, IconButton
} from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { getCategoryRequest } from 'src/slices/dictionary'
import { useDispatch, useSelector } from 'src/store/hooks'
import LoadingScreen from 'src/components/LoadingScreen'
import CloseIcon from '@material-ui/icons/Close'
import { useStyles } from './stylesModal'

export const ShowCategoryModal = ({ categoryId, onClose }: { categoryId: string, onClose: any}): any => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { category, loading } = useSelector((store) => store.dictionary.item)

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryRequest(categoryId))
    }
  }, [dispatch, categoryId])

  console.log(category)
  const Words = () => (
    <>
      {category?.words.map((word) => (
        <p key={word._id}>
          <div>
            {word.title}
          </div>
          <div className={classes.wordContent}>
            {word.content}
          </div>
        </p>
      ))}
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
          onClick={onClose}
        >
          <ListItemText primary="Delete this category" />
        </ListItem>
      </DialogActions>
    </Dialog>
  )
}

export default ShowCategoryModal
