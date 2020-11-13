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
  FormControl,
  MenuItem,
  InputLabel,
  Input,
  Select,
} from '@material-ui/core'
import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL, USERS_URL } from 'src/constants'
import useAuth from 'src/hooks/useAuth'
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
  const { user } = useAuth()
  const { t } = useTranslation()

  const allowUsers = user.role === 'superadmin'
    ? ['superadmin', 'admin', 'teacher', 'user']
    : ['teacher', 'user']

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required(t('admin.this is a required field')),
        email: Yup.string().email().required(t('admin.this is a required field')),
        role: Yup.string(),
        // password: Yup.string().min(6, 'Min 6').required()
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          if (id) {
            delete values.password
          }

          if (id) {
            instanceAxios.put(`${API_BASE_URL}/users/${id}`, values)
              .then(() => {
                enqueueSnackbar(t('notify.user was updated'), {
                  variant: 'success',
                  autoHideDuration: 2000
                })
                setStatus({ success: true })
                setSubmitting(false)
                history.push(`${USERS_URL}`)
              })
              .catch((err) => { setErrors({ submit: err.response.data.error }) })
          } else {
            instanceAxios.post(`${API_BASE_URL}/users`, values)
              .then(() => {
                enqueueSnackbar(t('notify.user was created'), {
                  variant: 'success',
                  autoHideDuration: 2000
                })
                setStatus({ success: true })
                setSubmitting(false)
                history.push(`${USERS_URL}`)
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
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label={t('pageAuth.name')}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                  <Box
                    mt={2}
                    mb={1}
                  >
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label={t('pageAuth.email')}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      variant="outlined"
                    />
                  </Box>
                  <Box
                    mt={2}
                    mb={1}
                  >
                    <FormControl
                      fullWidth
                      className={classes.formControl}
                      error={Boolean(touched.role && errors.role)}
                    >
                      <InputLabel id="form-select-1">{t('pageAuth.role')}</InputLabel>
                      <Select
                        labelId="form-select-1"
                        name="role"
                        value={values.role}
                        displayEmpty
                        onChange={handleChange}
                        input={<Input id="select-multiple-chip" />}
                      >
                        {allowUsers.map((role) => (
                          <MenuItem
                            key={role}
                            value={role}
                          >
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{touched.role && errors.role}</FormHelperText>
                    </FormControl>

                  </Box>
                  {id ? null
                    : (
                      <Box
                        mt={2}
                        mb={1}
                      >
                        <TextField
                          error={Boolean(touched.password && errors.password)}
                          fullWidth
                          helperText={touched.password && errors.password}
                          label={t('pageAuth.password')}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          variant="outlined"
                        />
                      </Box>
                    )}

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
