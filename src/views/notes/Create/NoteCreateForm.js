import React, { useState } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import AddOutlined from '@material-ui/icons/AddOutlined'
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
  TextField,
  makeStyles,
  IconButton,
  Chip,
  SvgIcon,
} from '@material-ui/core'
import { Plus as PlusIcon } from 'react-feather'
import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL, NOTES_URL } from 'src/constants'
import { useTranslation } from 'react-i18next'
import SectionCreate from 'src/components/Section/Create'
import SectionList from 'src/components/Section/List/index'

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
  className, initialValue, id, match, topics, ...rest
}) {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [tag, setTag] = useState('')
  const { t } = useTranslation()
  const [isShow, setIsShow] = useState(false)
  const [myContents, setMyContents] = useState([])

  const onAdd = () => {
    setIsShow(true)
  }

  const onSave = (record) => {
    setIsShow(false)
    if (!record.data) {
      return false
    }
    setMyContents([...myContents, record])
  }

  const onCancel = () => {
    setIsShow(false)
    console.log('cancel and myContents is', myContents)
  }

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={Yup.object().shape({
        topic: Yup.array().required(),
        title: Yup.string().max(255).required(),
        description: Yup.string().required().max(1500),
        tags: Yup.array(),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        const contents = [...myContents, ...values.contents]
        const data = { ...values, contents }
        try {
          if (id) {
            instanceAxios
              .put(`${API_BASE_URL}/notes/${id}`, data)
              .then(() => {
                enqueueSnackbar('note.notify.was_update', { variant: 'success' })
                setStatus({ success: true })
                setSubmitting(false)
                history.push(`${NOTES_URL}`)
              })
          } else {
            instanceAxios
              .post(`${API_BASE_URL}/notes`, data)
              .then(() => {
                enqueueSnackbar(t('note.notify.was_created'), { variant: 'success' })
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
                {/* <CardHeader title="Organize" /> */}
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
                      label="tags"
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
                    {values.tags.map((tg, i) => (
                      <Chip
                        variant="outlined"
                        key={i}
                        label={tg}
                        className={classes.tag}
                        onDelete={() => {
                          const newTg = values.tags.filter((t) => t !== tg)
                          setFieldValue('tags', newTg)
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            { !values.contents.length ? null
              : (
                <Grid
                  xs={12}
                  lg={12}
                  item
                >
                  <Card>
                    <CardHeader title="Content" />
                    <Divider />
                    <CardContent>
                      <SectionList contents={values.contents} />
                    </CardContent>
                  </Card>
                </Grid>
              ) }

            <Grid
              xs={12}
              lg={12}
              item
            >

              {!isShow ? null : (
                <SectionCreate
                  onCancel={onCancel}
                  onSave={onSave}
                />
              )}

              {isShow ? null
                : (
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      onClick={onAdd}
                      startIcon={<AddOutlined />}
                    >
                      Добавить запись
                    </Button>
                  </Box>
                )}
            </Grid>
          </Grid>

          {errors.submit && (
          <Box mt={3}>
            <FormHelperText error>
              {errors.submit}
            </FormHelperText>
          </Box>
          )}
          <Box mt={5}>
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
