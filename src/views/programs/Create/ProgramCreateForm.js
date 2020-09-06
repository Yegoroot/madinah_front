import React, { /* useState */ } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  makeStyles,
  FormControlLabel,
  Switch,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import FilesDropzone from 'src/components/FilesDropzone'
import { instanceAxios } from 'src/utils/axios'
import { IMAGES_BASE_URL, API_BASE_URL, /* PROGRAMS_URL */ } from 'src/constants'

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}))

function ProductCreateForm({
  className, initialValues, id, ...rest
}) {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const srcPhoto = initialValues.photo ? `${IMAGES_BASE_URL}/${initialValues.photo}` : null

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required(),
        description: Yup.string().max(1500),
        // tags: Yup.array(),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          const formData = new FormData()
          formData.set('title', values.title)
          formData.set('description', values.description)
          formData.set('publish', values.publish)
          if (values.file) { formData.append('photo', values.file) }

          const method = id ? 'put' : 'post'
          const url = id ? `${API_BASE_URL}/programs/${id}` : `${API_BASE_URL}/programs/`
          const setErr = (err) => (id ? err.response.data.error : err.message)
          const message = id ? t('notify.program.was_update') : t('notify.program.was_created')

          instanceAxios[method](url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => {
              enqueueSnackbar(message, { variant: 'success', autoHideDuration: 2000 })
              setStatus({ success: true })
              setSubmitting(false)
              history.push(`/programs/${res.data.data.id}`)
            })
            .catch((err) => {
              setErrors({ submit: setErr(err) })
            })
        } catch (err) {
          setErrors({ submit: err.message })
          setStatus({ success: false })
          setSubmitting(false)
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={8}
            >
              <Card>
                <CardContent>
                  <TextField
                    error={Boolean(touched.title && errors.title)}
                    fullWidth
                    helperText={touched.title && errors.title}
                    label="Program Title"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    variant="outlined"
                  />
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <TextField
                      error={Boolean(touched.description && errors.description)}
                      fullWidth
                      helperText={touched.description && errors.description}
                      label="Program description"
                      name="description"
                      multiline
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>

              {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
              </Box>
              )}
              <Box mt={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {id ? 'Update Program' : 'Create Program'}
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
            >
              <Card>
                <CardHeader title="Organize" />
                <Divider />
                <CardContent>
                  <Box
                    px={1}
                  >
                    <FormControlLabel
                      control={(
                        <Switch
                          checked={values.publish}
                          edge="start"
                          name="publish"
                          onChange={(event) => setFieldValue('publish', event.target.checked)}
                        />
                      )}
                      label="Publish"
                    />
                  </Box>
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Images" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone
                      setFieldValue={setFieldValue}
                      srcPhoto={srcPhoto}
                      one
                      photo
                    />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>

        </form>
      )}
    </Formik>
  )
}

ProductCreateForm.propTypes = {
  className: PropTypes.string,
  initialValues: PropTypes.object,
}

export default ProductCreateForm
