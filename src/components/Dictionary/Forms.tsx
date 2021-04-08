/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import * as Yup from 'yup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Dialog } from '@material-ui/core'
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
import { WordType, CategoryType } from 'src/slices/dictionary'

const useStyles = makeStyles((theme) => ({
  actions: {
    justifyContent: 'flex-start'
  },
  head: {
    paddingBottom: 0,
    paddingLeft: 10
  },
  title: {
    marginBottom: 16,
    marginTop: 8,
    '& input': {
      fontSize: 21
    }
  },
  paper: {
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      'min-width': '95%'
    }
  },
  dialogContent: {
    [theme.breakpoints.down('sm')]: {
      padding: 10
    }
  },

}))

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
          title: Yup.string().max(255),
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
            <DialogTitle className={classes.head}>New Word</DialogTitle>
            <DialogContent className={classes.dialogContent}>

              <Select
                value={values.category}
                collection={categories}
                collectionElement={['_id', 'title']} // elemt of collection
                name="category"
                id="category"
                label={t('dictionary.category')}
                error={Boolean(touched.category && errors.category)}
                onChange={handleChange}
                helper={touched.category && errors.category}
              />
              <TextField
                fullWidth
                className={classes.title}
                label={t('dictionary.word')}
                name="title"
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
            <DialogActions className={classes.actions}>
              <Button
                onClick={() => handleSubmit()}
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
          </>
        )}
      </Formik>
    </Dialog>

  )
}

export const FormCategory = ({ isOpen, onClose, onChange }: {isOpen: boolean, onClose: any, onChange: any}): any => {
  const classes = useStyles()
  const [title, setTitle] = useState('')

  const onSend = () => {
    if (!title) return

    const category: CategoryType = {
      _id: ObjectID.generate(),
      title,
      words: []
    }
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
      <DialogActions className={classes.actions}>
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
