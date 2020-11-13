import React from 'react'
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
  FormHelperText,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core'
import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL, TYPES_URL } from 'src/constants'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(() => ({
  root: {},
}))

function ProductCreateForm({
  className, initialValue, id, ...rest
}) {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required(),
        color: Yup.string().required(),
        alias: Yup.string().required(),

        // password: Yup.string().min(6, 'Min 6').required()
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          if (id) {
            instanceAxios.put(`${API_BASE_URL}/types/${id}`, values)
              .then(() => {
                enqueueSnackbar(t('notify.type was updated'), {
                  variant: 'success',
                  autoHideDuration: 2000
                })
                setStatus({ success: true })
                setSubmitting(false)
                history.push(`${TYPES_URL}`)
              })
              .catch((err) => { setErrors({ submit: err.response.data.error }) })
          } else {
            instanceAxios.post(`${API_BASE_URL}/types`, values)
              .then(() => {
                enqueueSnackbar(t('notify.type was created'), {
                  variant: 'success',
                  autoHideDuration: 2000
                })
                setStatus({ success: true })
                setSubmitting(false)
                history.push(`${TYPES_URL}`)
              })
              .catch((err) => { setErrors({ submit: err.response.data.error }) })
          }
        } catch (err) {
          setErrors({ submit: err.response.data.error })
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
              lg={10}
            >
              <Card>
                <CardContent>
                  <TextField
                    error={Boolean(touched.title && errors.title)}
                    fullWidth
                    helperText={touched.title && errors.title}
                    label={t('table.title')}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    variant="outlined"
                  />
                  <Box
                    mt={2}
                    mb={1}
                  >
                    <TextField
                      error={Boolean(touched.alias && errors.alias)}
                      fullWidth
                      helperText={touched.alias && errors.alias}
                      label={t('table.alias')}
                      name="alias"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.alias}
                      variant="outlined"
                    />
                  </Box>
                  <Box
                    mt={2}
                    mb={1}
                  >
                    <TextField
                      error={Boolean(touched.color && errors.color)}
                      fullWidth
                      helperText={touched.color && errors.color}
                      label={t('table.color')}
                      name="color"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.color}
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

            </Grid>
            <Grid
              item
              xs={12}
              lg={2}
            >
              <Box mt={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {id ? t('admin.update') : t('admin.create')}
                </Button>
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
  initialValue: PropTypes.object,
}

export default ProductCreateForm
