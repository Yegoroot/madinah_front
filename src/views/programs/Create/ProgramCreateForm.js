/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useNotification } from 'src/hooks/useNotification'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  TextField,
  Chip,
  makeStyles,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Backdrop,
  Input,
  FormControl,
  Switch,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import FilesDropzone from 'src/components/FilesDropzone'
import { instanceAxios } from 'src/utils/axios'
import {
  UPLOADS_URL, API_BASE_URL, LEVELS, LANGUAGES
} from 'src/constants'
import LoadingScreen from 'src/components/LoadingScreen'

const useStyles = makeStyles((theme) => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  },
}))

function ProductCreateForm({
  className, initialValues, id, allTypes, ...rest
}) {
  const classes = useStyles()
  const history = useHistory()
  const notify = useNotification()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const srcPhoto = initialValues.photo
    ? `${UPLOADS_URL}/programs/${id}/photo/compress/${initialValues.photo}`
    : null

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required(t('admin.this is a required field')),
        language: Yup.string(), // .required(t('admin.this is a required field')),
        level: Yup.string().required(t('admin.this is a required field')),
        description: Yup.string().max(400),
        types: Yup.array(),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          setLoading(true)
          const formData = new FormData()
          formData.set('title', values.title)
          formData.set('description', values.description)
          formData.set('publish', values.publish)
          formData.set('level', values.level)
          formData.set('language', values.language)
          formData.set('types', JSON.stringify(values.types))
          if (values.file) { formData.append('photo', values.file) }

          const method = id ? 'put' : 'post'
          const url = id ? `${API_BASE_URL}/programs/${id}` : `${API_BASE_URL}/programs/`
          const setErr = (err) => (id ? err.response.data.error : err.message)
          const message = id ? t('notify.program was updated') : t('notify.program was created')

          instanceAxios[method](url, formData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => {
              notify({ message })
              setStatus({ success: true })
              setSubmitting(false)
              history.push(`/programs/${res.data.data.id}`)
            })
            .catch((err) => {
              setSubmitting(false)
              setErrors({ submit: setErr(err) })
              setStatus({ success: false })
              // axios handler work instead
              // notify({ message: err.message, variant: 'error' })
              setLoading(false)
            })
        } catch (err) {
          setErrors({ submit: 'err.message' })
          setStatus({ success: false })
          setSubmitting(false)
          notify({ message: err.message, variant: 'error' })
          setLoading(false)
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
          <Backdrop
            className={classes.backdrop}
            open={loading}
          >
            <LoadingScreen transparent />
          </Backdrop>
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
                    label={t('admin.title')}
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
                      label={t('admin.description')}
                      name="description"
                      multiline
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      variant="outlined"
                    />
                  </Box>

                  <Box
                    mb={3}
                  >
                    <Grid
                      item
                      spacing={2}
                      container
                    >
                      <Grid
                        item
                        container
                        xs={12}
                        lg={6}
                      >
                        <FormControl
                          fullWidth
                          className={classes.formControl}
                          error={Boolean(touched.level && errors.level)}
                        >
                          <InputLabel id="form-select-4">{t('admin.level')}</InputLabel>
                          <Select
                            labelId="form-select-4"
                            name="level"
                            value={values.level}
                            displayEmpty
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip" />}
                          >
                            {LEVELS.map((level) => (
                              <MenuItem
                                key={level}
                                value={level}
                              >
                                {t(`chips.${level}`)}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{touched.level && errors.level}</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={12}
                        lg={6}
                      >
                        <FormControl
                          fullWidth
                          className={classes.formControl}
                          error={Boolean(touched.language && errors.language)}
                        >
                          <InputLabel id="form-select-5">{t('admin.language')}</InputLabel>
                          <Select
                            labelId="form-select-5"
                            name="language"
                            value={values.language}
                            displayEmpty
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip2" />}
                          >
                            {LANGUAGES.map((lang) => (
                              <MenuItem
                                key={lang}
                                value={lang}
                              >
                                {t(`chips.${lang}`)}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{touched.language && errors.language}</FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box
                    mb={2}
                  >

                    {allTypes.length && (
                    <FormControl
                      fullWidth
                      className={classes.formControl}
                      error={Boolean(touched.types && errors.types)}
                    >
                      <InputLabel id="demo-mutiple-chip-label">
                        {t('admin.type of program')}
                      </InputLabel>
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
              lg={4}
            >
              <Box mb={2}>
                <Card>
                  <CardContent>
                    <Box px={1}>
                      <FormControlLabel
                        control={(
                          <Switch
                            checked={values.publish}
                            edge="start"
                            name="publish"
                            onChange={(event) => setFieldValue('publish', event.target.checked)}
                          />
                      )}
                        label={t('admin.publish')}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Card>
                <CardContent>
                  <FilesDropzone
                    setFieldValue={setFieldValue}
                    srcPhoto={srcPhoto}
                    one
                    type="photo"
                  />
                </CardContent>
              </Card>

            </Grid>
          </Grid>
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
