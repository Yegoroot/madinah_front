/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import * as Yup from 'yup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Dialog, } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useTranslation } from 'react-i18next'
import SunEditor from 'src/components/SunEditor'
import { Formik } from 'formik'
import Select from 'src/components/Select'
import { IWordType, ICategoryType, createWord } from 'src/slices/dictionary'
import { useDispatch, } from 'src/store/hooks'
import { useStyles } from './stylesModal'

export const CreateWordModal = ({
  isOpen, categories, onClose, onCloseDictionary
}:
   {isOpen: boolean, onClose: any, categories: ICategoryType[], onCloseDictionary: any}): any => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = useStyles()

  const initialValue: IWordType = {
    title: '',
    content: '',
    category: ''
  }

  return (

    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-word"
      fullWidth
      maxWidth="md"
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
          dispatch(createWord(values))
          onCloseDictionary()
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
            <DialogTitle
              disableTypography
              className={classes.dialogTitle}
            >
              {t('dict.New Word')}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Select
              // @ts-ignore FIXME если вынести word на бекенду в отдельную сущность
               //  то тогда можно спокойно делать IWordType.category обязательным,
               //  и тогда мы сможем переносиить слова в разные категории, меняя только IWordType.category
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

export default CreateWordModal
