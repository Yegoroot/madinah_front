import React, { useState } from 'react'
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
  Paper,
  TextField,
  Typography,
  makeStyles,
  IconButton,
  FormControlLabel,
  FormControl,
  MenuItem,
  InputLabel,
  Input,
  Select,
  Switch,
  Chip,
  SvgIcon,
} from '@material-ui/core'
import SunEditor from 'src/components/SunEditor'
import FilesDropzone from 'src/components/FilesDropzone'
import { Plus as PlusIcon } from 'react-feather'
import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL, IMAGES_BASE_URL, TOPICS_URL } from 'src/constants'

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}))

function ProductCreateForm({
  className, initialValue, id, programs, ...rest
}) {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [tag, setTag] = useState('')

  const srcPhoto = initialValue.photo ? `${IMAGES_BASE_URL}/${initialValue.photo}` : null

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required(),
        description: Yup.string().max(1500).required(),
        content: Yup.string().max(5000),
        tags: Yup.array(),
        program: Yup.string().required()
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
          formData.set('content', values.content)
          formData.set('program', values.program)
          formData.set('publish', values.publish)
          if (values.file) {
            formData.append('photo', values.file)
          }
          if (values.tags.length) {
            formData.append('tags', JSON.stringify(values.tags))
          }

          if (id) {
            instanceAxios.put(`${API_BASE_URL}/topics/${id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then(() => {
                enqueueSnackbar(`Topic ${values.title} Updated `, {
                  variant: 'success',
                  autoHideDuration: 2000
                })
                setStatus({ success: true })
                setSubmitting(false)
                history.push(`${TOPICS_URL}`)
              })
              .catch((err) => { setErrors({ submit: err.response.data.error }) })
          } else {
            instanceAxios.post(`${API_BASE_URL}/topics`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then(() => {
                enqueueSnackbar(`Topic ${values.title} Created `, {
                  variant: 'success',
                  autoHideDuration: 2000
                })
                setStatus({ success: true })
                setSubmitting(false)
                history.push(`${TOPICS_URL}`)
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
              lg={8}
            >
              <Card>
                <CardContent>
                  <TextField
                    error={Boolean(touched.title && errors.title)}
                    fullWidth
                    helperText={touched.title && errors.title}
                    label="Topic Title"
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
                      label="Topic description"
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      variant="outlined"
                    />
                  </Box>
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      content
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <SunEditor
                      className={classes.editor}
                      value={values.content}
                      content={values.content}
                      onChange={(value) => setFieldValue('content', value)}
                    />
                  </Paper>
                  {(touched.content && errors.content) && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.content}
                      </FormHelperText>
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
              <Box mt={2}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {id ? 'Update Topic' : 'Create Topic'}
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
                  <Box
                    mt={2}
                    display="flex"
                    alignItems="center"
                  >
                    {!programs ? null
                      : (
                        <FormControl
                          fullWidth
                          className={classes.formControl}
                          error={Boolean(touched.program && errors.program)}
                        >
                          <InputLabel id="form-select-1">Программа обучения</InputLabel>
                          <Select
                            labelId="form-select-1"
                            name="program"
                            value={values.program}
                            displayEmpty
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip" />}
                          >
                            {programs.map((program) => (
                              <MenuItem
                                key={program.id}
                                value={program.id}
                              >
                                {program.title}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{touched.program && errors.program}</FormHelperText>
                        </FormControl>
                      )}
                  </Box>
                  <Box
                    mt={2}
                    display="flex"
                    alignItems="center"
                  >
                    <TextField
                      fullWidth
                      label="Tags"
                      name="tags"
                      value={tag}
                      onChange={(event) => setTag(event.target.value)}
                      variant="outlined"
                    />
                    <IconButton
                      variant="contained"
                      className={classes.addTab}
                      onClick={() => {
                        if (!tag) {
                          return
                        }

                        setFieldValue('tags', [...values.tags, tag])
                        setTag('')
                      }}
                    >
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    </IconButton>
                  </Box>
                  <Box mt={2}>
                    {values.tags.map((tagEl, i) => (
                      <Chip
                        variant="outlined"
                        key={i}
                        label={tagEl}
                        className={classes.tag}
                        onDelete={() => {
                          const newTags = values.tags.filter((t) => t !== tagEl)
                          setFieldValue('tags', newTags)
                        }}
                      />
                    ))}
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
  initialValue: PropTypes.object,
}

export default ProductCreateForm
