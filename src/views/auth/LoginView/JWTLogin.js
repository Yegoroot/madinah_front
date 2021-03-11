import React from 'react'
import clsx from 'clsx'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles
} from '@material-ui/core'
import useAuth from 'src/hooks/useAuth'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(() => ({
  root: {},
  foreignField: {
    direction: 'ltr'
  }
}))

const JWTLogin = ({ ...rest }) => {
  const classes = useStyles()
  const { login } = useAuth()
  const isMountedRef = useIsMountedRef()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email(t('pageAuth.Must be a valid email'))
          .max(255).required(t('pageAuth.Email is required')),
        password: Yup.string().max(255).required(t('pageAuth.Password is required'))
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await login(values.email, values.password)

          if (isMountedRef.current) {
            setStatus({ success: true })
            setSubmitting(false)
          }
        } catch (err) {
          console.error(err)
          if (isMountedRef.current) {
            setStatus({ success: false })
            const submit = err.response.data ? err.response.data.error : 'Bro smth error'
            setErrors({ submit })
            setSubmitting(false)
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          noValidate
          onSubmit={handleSubmit}
          className={clsx(classes.root)}
          {...rest}
        >
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            // autoFocus
            className="not-ar"
            helperText={touched.email && errors.email}
            label={t('pageAuth.email')}
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            className="not-ar"
            fullWidth
            helperText={touched.password && errors.password}
            label={t('pageAuth.password')}
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
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
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {t('pageAuth.login')}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

JWTLogin.propTypes = {
  className: PropTypes.string,
}

export default JWTLogin
