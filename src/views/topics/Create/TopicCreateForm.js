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
  // IconButton,
  // Chip,
  // SvgIcon,
} from '@material-ui/core'
// import { Plus as PlusIcon } from 'react-feather'
import { instanceAxios } from 'src/utils/axios'
import { API_BASE_URL, TOPICS_URL } from 'src/constants'
import { useTranslation } from 'react-i18next'
import SectionCreate from 'src/components/Section/Create'
import SectionList from 'src/components/Section/List'

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
  className, initialValue, id, /* match, */ location, programs, ...rest
}) {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  // const [tag, setTag] = useState('')
  const { t } = useTranslation()
  const [isShow, setIsShow] = useState(false)
  const [redirect, setRedirect] = useState('continue')
  const [contents, setContents] = useState(initialValue.contents)

  const onAdd = () => setIsShow(true)
  const onCancel = () => setIsShow(false)

  const onSave = ({ record, action, index }) => {
    setIsShow(false) // закрываем окно
    if (!record.data) return false // если контент пустой то не сохраняем
    if (action === 'update') { // обновить запись
      const newContents = [...contents]
      newContents[index] = { ...record }
      setContents(newContents)
      console.log(index, record)
    } else {
      setContents([...contents, record]) // добавить запись
    }
    return false
  }

  const onDelete = (recordId) => {
    const filtering = contents.filter((content) => content.id !== recordId)
    setContents(filtering)
  }

  const onEdit = (recordId) => {
    console.log(recordId)
  }
  const initialValuesProgramHack = id
    ? { ...initialValue, program: initialValue.program.id }
    : initialValue

  const programId = location && location.state && location.state.programId
  if (programId) {
    initialValue.program = programId
  }

  return (
    <Formik
      initialValues={initialValuesProgramHack}
      validationSchema={Yup.object().shape({
        contents: Yup.array(),
        program: Yup.string().required(),
        title: Yup.string().max(255).required(),
        description: Yup.string().max(1500),
        // tags: Yup.array(),
      })}
      onSubmit={

        async (values, {
          setErrors,
          setStatus,
          setSubmitting
        }) => {
          const data = { ...values, contents }
          if (!contents.length) {
            setErrors({ submit: 'Добавьте одну или несколько записей' })
            setSubmitting(false)
            return false
          }
          try {
            const method = id ? 'put' : 'post'
            const url = id ? `${API_BASE_URL}/topics/${id}` : `${API_BASE_URL}/topics`
            const message = id ? t('notify.topic.was_updated') : t('notify.topic.was_created')

            instanceAxios[method](url, data)
              .then((response) => {
                const topic = response.data.data
                const redirectUrl = redirect === 'open'
                  ? `/programs/${topic.program}/topics/${topic.id}`
                  : TOPICS_URL

                setStatus({ success: true })
                setSubmitting(false)
                enqueueSnackbar(message, { variant: 'success' })
                history.push(`${redirectUrl}`)
              })
          } catch (err) {
            setErrors({ submit: err.response.data.error })
            setStatus({ success: false })
            setSubmitting(false)
          }
        }
}
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
                  {!programs ? null
                    : (
                      <FormControl
                        fullWidth
                        className={classes.formControl}
                        error={Boolean(touched.program && errors.program)}
                      >
                        <InputLabel id="form-select-1">Выберите программу</InputLabel>
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
                </CardContent>
              </Card>
            </Grid>

            { !contents.length ? null
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
                      <SectionList
                        onSave={onSave}
                        contents={contents}
                        onDelete={onDelete}
                        onEdit={onEdit}
                      />
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
              style={{ marginRight: 16, marginBottom: 8 }}
              onClick={
                () => {
                  setRedirect('open')
                  handleSubmit()
                }
              }
              disabled={isSubmitting}
            >
              {id ? 'Update and open' : 'Save and open' }
            </Button>
            <Button
              onClick={
              () => {
                setRedirect('continue')
                handleSubmit()
              }
            }
              color="secondary"
              variant="contained"
              disabled={isSubmitting}
            >
              {id ? 'Update and continue' : 'Save and continue' }
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
  programs: PropTypes.array,
  initialValue: PropTypes.object,
  // match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default ProductCreateForm
