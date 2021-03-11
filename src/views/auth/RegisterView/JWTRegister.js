import React from 'react'
import clsx from 'clsx'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core'
import useAuth from 'src/hooks/useAuth'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(() => ({
  root: {}
}))

const JWTRegister = ({ ...rest }) => {
  const classes = useStyles()
  const { register } = useAuth()
  const isMountedRef = useIsMountedRef()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        policy: false,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email(t('pageAuth.Must be a valid email'))
          .max(255).required(t('pageAuth.Email is required')),
        password: Yup.string().max(255).required(t('pageAuth.Password is required')),
        name: Yup.string().max(255).required(t('pageAuth.Name is required')),
        policy: Yup.boolean().oneOf([true], t('pageAuth.This field must be checked'))
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await register(values.email, values.name, values.password)

          if (isMountedRef.current) {
            setStatus({ success: true })
            setSubmitting(false)
          }
        } catch (err) {
          console.error(err)
          setStatus({ success: false })
          const submit = err.response.data ? err.response.data.error : 'Bro smth error'
          setErrors({ submit })
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
        touched,
        values
      }) => (
        <form
          noValidate
          className={clsx(classes.root)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label={t('pageAuth.name')}
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
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
          <Box
            alignItems="center"
            display="flex"
            mt={2}
            ml={-1}
          >
            <Checkbox
              checked={values.policy}
              name="policy"
              onChange={handleChange}
            />
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {t('pageAuth.I have read')}
              {' '}
              <Link
                component="a"
                href="#"
                color="secondary"
              >
                {t('pageAuth.Terms and Conditions')}
              </Link>
              {' '}
              {t('pageAuth.I agree with them')}
            </Typography>
          </Box>
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>
              {errors.policy}
            </FormHelperText>
          )}
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
              {t('pageAuth.register')}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default JWTRegister
