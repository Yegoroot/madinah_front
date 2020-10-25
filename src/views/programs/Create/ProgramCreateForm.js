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
  Chip,
  makeStyles,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Input,
  FormControl,
  Switch,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import FilesDropzone from 'src/components/FilesDropzone'
import { instanceAxios } from 'src/utils/axios'
import { UPLOADS_URL, API_BASE_URL } from 'src/constants'

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}))

function ProductCreateForm({
  className, initialValues, id, allTypes, ...rest
}) {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const srcPhoto = initialValues.photo
    ? `${UPLOADS_URL}/programs/${id}/photo/compress/${initialValues.photo}`
    : null

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required(),
        description: Yup.string().max(1500),
        types: Yup.array(),
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
          formData.set('types', JSON.stringify(values.types))
          if (values.file) { formData.append('photo', values.file) }

          const method = id ? 'put' : 'post'
          const url = id ? `${API_BASE_URL}/programs/${id}` : `${API_BASE_URL}/programs/`
          const setErr = (err) => (id ? err.response.data.error : err.message)
          const message = id ? t('notify.program.was_updated') : t('notify.program.was_created')

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
                    mb={3}
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
                  {!allTypes.length ? null
                    : (
                      <FormControl
                        fullWidth
                        className={classes.formControl}
                        error={Boolean(touched.types && errors.types)}
                      >
                        <InputLabel id="demo-mutiple-chip-label">Choose type of program (if you want)</InputLabel>
                        <Select
                          labelId="demo-mutiple-chip-label"
                          name="types"
                          multiple
                          value={values.types}
                          onChange={handleChange}
                          input={<Input id="select-multiple-chip" />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  label={allTypes.find((el) => el._id === value).title}
                                />
                              ))}
                            </div>
                          )}
                        >
                          {allTypes.map((name) => (
                            <MenuItem
                              key={name._id}
                              value={name._id}
                            >
                              {name.title}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{touched.types && errors.types}</FormHelperText>
                      </FormControl>
                    ) }
                  {/*
                  {!allTypes ? null
                    : (
                      <FormControl
                        fullWidth
                        className={classes.formControl}
                        error={Boolean(touched.types && errors.types)}
                      >
                        <InputLabel id="form-select-1">Choose types</InputLabel>
                        <Select
                          labelId="form-select-1"
                          name="types"
                          value={values.program}
                          displayEmpty
                          onChange={handleChange}
                          input={<Input id="select-multiple-chip" />}
                        >
                          {allTypes.map((t) => (
                            <MenuItem
                              key={t._id}
                              value={t._id}
                            >
                              {t.title}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{touched.types && errors.types}</FormHelperText>
                      </FormControl>
                    )} */}
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
                      type="photo"
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
  allTypes: PropTypes.array.isRequired
}

export default ProductCreateForm
