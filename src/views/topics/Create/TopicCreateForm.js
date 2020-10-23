/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import AddOutlined from '@material-ui/icons/AddOutlined'
import {
  Box, Button, Select, InputLabel,
  Input, FormControl, MenuItem, Card, CardContent,
  CardHeader, Divider, FormControlLabel, Backdrop,
  Switch, FormHelperText, Grid, TextField, makeStyles,
} from '@material-ui/core'
import ObjectID from 'bson-objectid'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL, TOPICS_URL } from 'src/constants'
import { useTranslation } from 'react-i18next'
import CreateRecord from 'src/components/Record/Create'
import EditRecordList from 'src/components/Record/EditRecordList'
import LoadingScreen from 'src/components/LoadingScreen'
import { useStateWithCallbackLazy } from 'use-state-with-callback'
import ModalOrder from 'src/components/Draggble/Modal'

const useStyles = makeStyles((theme) => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

function TopicCreateForm({
  className, initialValue, id, /* match, */ location, programs, ...rest
}) {
  /**
   * create object ID for topic
   *  we need to know id before create
   * for records
   */
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const initTopicId = () => id || ObjectID.generate()
  const [topicId] = useState(initTopicId()) // WARN 1
  const [isShow, setIsShow] = useState(false)
  const initProgramId = () => {
    // пришло из редактирование
    if (id) {
      return initialValue.program.id
    }
    // пришло из Link state
    return (location && location.state && location.state.programId) || ''
  }
  const [programId, setPreviousProgramId] = useState(initProgramId())
  const [redirect, setRedirect] = useState('continue')
  const [loading, setLoading] = useState(false)
  const [contents, setContents] = useStateWithCallbackLazy(initialValue.contents)

  // const handleClose = () => {
  //   setLoading(false)
  // }

  const onAdd = () => setIsShow(true)

  const onCancel = () => setIsShow(false)

  const onEdit = (record) => { console.log('onEdit', record._id) }

  const newInitialValue = {
    ...initialValue,
    program: programId
  }

  // eslint-disable-next-line consistent-return
  const onSubmitFunction = async (values, { setErrors, setStatus, setSubmitting }) => {
    const data = { ...values, contents }
    if (!contents.length) {
      setErrors({ submit: 'Добавьте одну или несколько записей' })
      setSubmitting(false)
      return false
    }
    data._id = topicId // if we create form then define own ObjectId // WARN 2
    data.programId = programId // we will check, because in process editing
    try {
      const method = id ? 'put' : 'post'
      const url = id ? `${API_BASE_URL}/topics/${id}` : `${API_BASE_URL}/topics`
      const message = id ? t('notify.topic.was_updated') : t('notify.topic.was_created')
      setLoading(true)
      axios[method](url, data)
        .then((response) => {
          const topic = response.data.data
          const redirectUrl = redirect === 'continue'
            ? `${TOPICS_URL}/${topic.id}/edit`
            : `/programs/${topic.program}/topics/${topic.id}`

          setStatus({ success: true })
          setSubmitting(false)
          setLoading(false)
          enqueueSnackbar(message, { variant: 'success' })
          history.push(`${redirectUrl}`)
        })
    } catch (err) {
      setLoading(false)
      setErrors({ submit: err.response.data.error })
      setStatus({ success: false })
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={newInitialValue}
      validationSchema={Yup.object().shape({
        contents: Yup.array(),
        program: Yup.string().required(),
        title: Yup.string().max(255).required(),
        description: Yup.string().max(1500)
      })}
      onSubmit={onSubmitFunction}
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
      }) => {
        // console.log('programId-', programId, ' topicId-', topicId)

        const onUpdateOrder = (items) => {
          setContents(items, () => {
            handleSubmit()
          }) // Обновить порядок записей
        }

        const onDelete = (record) => {
          const filtering = contents.filter((content) => content._id !== record._id)
          setContents(filtering, () => {
            if (record.type === 'image') {
              setLoading(true)
              axios.post(`${API_BASE_URL}/topics/recorddelete`, { programId, topicId, recordId: record._id })
                .then((res) => { handleSubmit() })
                .catch((err) => { setLoading(false) })
            }
          })
        }

        const onSave = ({ record, action, index }) => {
          setIsShow(false) // закрываем окно
          if (!record.data) return false // если контент пустой то не сохраняем
          // console.log(record)
          // console.log(`Record ${action}`, record)
          if (action === 'update') { // обновить запись
            const newContents = [...contents]
            newContents[index] = { ...record }
            setContents(newContents, () => {
              if (record.type === 'image') {
                handleSubmit()
              }
            })
          } else {
            setContents([...contents, record], () => {
              if (record.type === 'image') {
                handleSubmit()
              }
            }) // добавить запись
          }
          return false
        }

        return (
          <form
            onSubmit={handleSubmit}
            className={clsx(classes.root, className)}
            {...rest}
          >
            <Backdrop
              className={classes.backdrop}
              open={loading}
              // onClick={handleClose}
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
                            onChange={
                              (e) => {
                                setPreviousProgramId((prevState) => (prevState || e.target.value))
                                handleChange(e)
                              }
}
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

                    {!(contents.length > 2) ? null
                      : (
                        <Box
                          mt={2}
                        >
                          <ModalOrder
                            contents={contents}
                            onUpdate={onUpdateOrder}
                          />
                        </Box>

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
                        <EditRecordList
                          programId={programId}
                          topicId={topicId}
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
                  <CreateRecord
                    programId={programId}
                    topicId={topicId}
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
                style={{ marginBottom: 8, marginRight: 16 }}
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
            </Box>

          </form>
        )
      }}
    </Formik>
  )
}

TopicCreateForm.propTypes = {
  className: PropTypes.string,
  id: PropTypes.any,
  programs: PropTypes.array,
  initialValue: PropTypes.object,
  location: PropTypes.object.isRequired,
}

export default TopicCreateForm
