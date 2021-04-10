/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {
  Dialog, ListItemText, ListItem, IconButton
} from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import ObjectID from 'bson-objectid'
import { useTranslation } from 'react-i18next'
import SunEditor from 'src/components/SunEditor'
import { Formik } from 'formik'
import Select from 'src/components/Select'
import {
  WordType, CategoryType, getCategoryRequest, createCategoryRequest
} from 'src/slices/dictionary'
import { useDispatch, useSelector } from 'src/store/hooks'
import LoadingScreen from 'src/components/LoadingScreen'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    justifyContent: 'flex-start',
    color: theme.palette.error.main
  },
  dialogTitle: {
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
      paddingBottom: 0,
      paddingLeft: 10,
      paddingRight: 10
    }
  },
  dialogContent: {
    [theme.breakpoints.down('xs')]: {
      padding: 10
    }
  },

  paper: {
    [theme.breakpoints.down('xs')]: {
      width: '95%',
      'min-width': '95%'
    }
  },

  closeIcon: {
    color: theme.palette.error.main,
    marginLeft: 'auto'
  },
  // word form
  wordTitleInput: {
    marginBottom: 16,
    marginTop: 8,
    '& input': {
      fontSize: 21
    }
  },
  // word show
  wordContent: {
    fontSize: '.9rem'
  }
}))

/** SHOW CONTENT OF CATEGORY
 *
 *
 */

export const ModalShowCategory = ({ categoryId, onClose }: { categoryId: string, onClose: any}): any => {
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
      <DialogActions className={classes.dialogActions}>
        <ListItem
          button
          onClick={onClose}
        >
          <ListItemText primary=" Close" />
        </ListItem>
        {/* <Button

          color="secondary"
        /> */}
      </DialogActions>
    </Dialog>
  )
}
// export const ModalShowCategory = memo(ModalShowCategory1)

/** CREATE WORD FOR CATEGORY
 *
 *
 */

export const FormWord = ({ isOpen, categories, onClose }: {isOpen: boolean, onClose: any, categories: CategoryType[]}): any => {
  const { t } = useTranslation()
  const classes = useStyles()

  const initialValue: WordType = {
    title: '',
    content: '',
    category: ''
  }

  return (

    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-word"
      classes={{ paper: classes.paper, }}
    >
      <Formik
        initialValues={initialValue}
        validationSchema={Yup.object().shape({
          category: Yup.string().required(t('admin.this is a required field')),
          title: Yup.string().required(t('admin.this is a required field')).max(255),
          content: Yup.string(),
        })}
        onSubmit={async (values) => {
          console.log(values)
          onClose()
        }}
      >

        {({
          errors,
          handleChange,
          handleSubmit,
          setFieldValue,
          touched,
          values
        }) => (
          <>
            <DialogTitle className={classes.dialogTitle}>{t('dict.New Word')}</DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Select
                value={values.category}
                collection={categories}
                collectionElement={['_id', 'title']} // elemt of collection
                name="category"
                id="category"
                label={t('dict.choose category')}
                error={Boolean(touched.category && errors.category)}
                onChange={handleChange}
                helper={touched.category && errors.category}
              />
              <TextField
                fullWidth
                className={classes.wordTitleInput}
                label={t('dict.write word')}
                name="title"
                autoFocus
                value={values.title}
                onChange={handleChange}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
              <SunEditor
                content={values.content}
                height="150"
                mini
                onChange={(d: string) => setFieldValue('content', d)}
              />
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
              <Button
                onClick={() => handleSubmit()}
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
          </>
        )}
      </Formik>
    </Dialog>

  )
}

/** CREATE CATEGORY OF DICTIOANRY
 *
 *
 */

export const FormCategory = ({ isOpen, onClose, onChange }: {isOpen: boolean, onClose: any, onChange: any}): any => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')

  const onSend = async () => {
    if (!title) return

    const category: CategoryType = {
      _id: ObjectID.generate(),
      title,
      words: []
    }
    // await dispatch(createCategoryRequest())
    onChange(category)
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
      aria-labelledby="form-word"
      // classes={{ paper: classes.paper, }}
    >
      <DialogTitle id="form-word">{`${'New Category'}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a new category (for example: countries, foods)
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          onChange={(e) => setTitle(e.target.value)}
          label="Category Name"
          fullWidth
          value={title}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          onClick={onSend}
          color="primary"
        >
          Add
        </Button>
        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
