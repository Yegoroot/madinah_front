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
  Select,
  InputLabel,
  Input,
  FormControl,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Switch,
  FormHelperText,
  Grid,
  // Paper,
  TextField,
  // Typography,
  makeStyles,
  IconButton,
  Chip,
  SvgIcon,
} from '@material-ui/core'
import CreateRecord from 'src/components/Record/CreateRecord'
import { Plus as PlusIcon } from 'react-feather'
import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL, NOTES_URL } from 'src/constants'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

function ProductCreateForm({
  className, initialValue, id, topics, ...rest
}) {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [skill, setSkill] = useState('')

  const { t } = useTranslation()

  const onAddRecord = (data) => {
    console.log(data)
  }

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={Yup.object().shape({
        // level: Yup.number().required(),
        topic: Yup.array().required(),
        title: Yup.string().max(255).required(),
        description: Yup.string().required().max(1500),
        content: Yup.array(),
        minimumSkill: Yup.array(),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          if (id) {
            instanceAxios
              .put(`${API_BASE_URL}/notes/${id}`, values)
              .then(() => {
                enqueueSnackbar('Note Updated', { variant: 'success' })
                setStatus({ success: true })
                setSubmitting(false)
                history.push(`${NOTES_URL}`)
              })
          } else {
            instanceAxios
              .post(`${API_BASE_URL}/notes`, values)
              .then(() => {
                enqueueSnackbar(t('notification.note.was_created'), { variant: 'success' })
                setStatus({ success: true })
                setSubmitting(false)
                history.push(`${NOTES_URL}`)
              })
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
                <CardHeader title="Organize" />
                <Divider />
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

                </CardContent>
              </Card>

            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
            >
              <Card>
                {/* <CardHeader title="Organize" /> */}
                {/* <Divider /> */}
                <CardContent>
                  <Box
                    px={1}
                    mb={2}
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
                  {!topics ? null
                    : (
                      <FormControl
                        fullWidth
                        className={classes.formControl}
                        error={Boolean(touched.topic && errors.topic)}
                      >
                        <InputLabel id="demo-mutiple-chip-label">Выберите тему</InputLabel>
                        <Select
                          labelId="demo-mutiple-chip-label"
                          name="topic"
                          multiple
                          value={values.topic}
                          onChange={handleChange}
                          input={<Input id="select-multiple-chip" />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  label={topics.find((el) => el.id === value).title}
                                />
                              ))}
                            </div>
                          )}
                        >
                          {topics.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.id}
                            >
                              {name.title}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{touched.topic && errors.topic}</FormHelperText>
                      </FormControl>
                    ) }
                  <Box
                    mt={3}
                    display="flex"
                    alignItems="center"
                  >
                    <TextField
                      fullWidth
                      label="Skills"
                      name="minimumSkill"
                      value={skill}
                      onChange={(event) => setSkill(event.target.value)}
                      variant="outlined"
                    />
                    <IconButton
                      variant="contained"
                      className={classes.addTab}
                      onClick={() => {
                        if (!skill) {
                          return
                        }

                        setFieldValue('minimumSkill', [...values.minimumSkill, skill])
                        setSkill('')
                      }}
                    >
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    </IconButton>
                  </Box>
                  <Box mt={2}>
                    {values.minimumSkill.map((skl, i) => (
                      <Chip
                        variant="outlined"
                        key={i}
                        label={skl}
                        className={classes.skill}
                        onDelete={() => {
                          const newSkills = values.minimumSkill.filter((t) => t !== skl)
                          setFieldValue('minimumSkill', newSkills)
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              xs={12}
              lg={12}
              item
            >
              <CreateRecord
                content={values.content}
                onAddRecord={onAddRecord}
              />

            </Grid>
          </Grid>

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
              {id ? 'Update Note' : 'Save note' }
            </Button>
          </Box>

        </form>
      )}
    </Formik>
  )
}

ProductCreateForm.propTypes = {
  className: PropTypes.string,
  id: PropTypes.any,
  topics: PropTypes.array,
  initialValue: PropTypes.object
}

export default ProductCreateForm
