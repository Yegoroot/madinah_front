/* eslint-disable no-underscore-dangle */
import React, { useState, /* useEffect */ } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Backdrop,
  makeStyles,
  TextField,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import ObjectID from 'bson-objectid'
import SunEditor from 'src/components/SunEditor'
import MdeEditor from 'src/components/MdeEditor'
import ImageType from 'src/components/Section/Item/ImageType'
import { instanceAxios as axios } from 'src/utils/axios'
import { API_BASE_URL } from 'src/constants'
import LoadingScreen from 'src/components/LoadingScreen'

const CONTENT_TYPES = [
  {
    type: 'text',
    title: 'Текстовая запись'
  },
  {
    type: 'markdown',
    title: 'Markdown'
  },
  {
    type: 'image',
    title: 'Image'
  }
]

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    position: 'absolute'
  },
  root: {
    position: 'relative'
  },
}))

function SectionCreate({
  initialValues, onCancel, onSave, isUpdate, topicId, programId
}) {
  const defaultValues = {
    type: 'text',
    data: '',
    subtitle: ''
  }
  const [section, setSection] = useState(initialValues || defaultValues)
  const [objectId] = useState((prevState) => prevState || ObjectID.generate())
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const onSaveHandler = async () => {
    const _id = section._id ? section._id : objectId // если запись на update
    if (section.type === 'image') {
      if (!section.data.file) { return false }
      setLoading(true)
      const formData = new FormData()
      formData.append('image', section.data.file)
      formData.set('programId', programId)
      formData.set('topicId', topicId)
      formData.set('recordId', _id)
      await axios.post(`${API_BASE_URL}/topics/record`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
          const { image } = res.data
          onSave({ record: { ...section, data: { image }, _id } })
          setLoading(false)
        })
        .catch((err) => {
          onCancel(section._id)
          setLoading(false)
        })
    } else {
      onSave({ record: { ...section, _id } })
    }
    setSection({ ...defaultValues })
  }

  const onCancelHandler = () => {
    onCancel(section._id)
    setSection({ ...defaultValues })
  }

  return (
    <>

      <Card className={classes.root}>
        <Backdrop
          className={classes.backdrop}
          open={loading}
        >
          <LoadingScreen
            transparent
          />
        </Backdrop>

        <CardHeader title="Добавить запись в заметку" />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={4}
            >
              <TextField
                fullWidth
                name="option"
                onChange={(event) => setSection({
                  ...defaultValues,
                  subtitle: section.subtitle,
                  type: event.target.value
                })}
                select
                SelectProps={{ native: true }}
                value={section.type}
                variant="outlined"
              >
                {CONTENT_TYPES.map(({ type, title }) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {title}
                  </option>
                ))}
              </TextField>

            </Grid>
            <Grid
              item
              xs={12}
              md={8}
            >
              <TextField
                fullWidth
                label="Подзаголовок"
                onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
                name="subtitle"
                id="subtitle"
                value={section.subtitle}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box
            mt={3}
            mb={3}
          >
            {section.type === 'text'
              ? (
                <SunEditor
                  value={section.data}
                  content={section.data}
                  onChange={(data) => setSection((prev) => ({ ...prev, type: 'text', data }))}
                />
              ) : null }
            {section.type === 'markdown'
              ? (
                <MdeEditor
                  value={section.data}
                  onChange={(data) => setSection((prev) => ({ ...prev, type: 'markdown', data }))}
                />

              ) : null }

            {section.type === 'image'
              ? (
                <ImageType
                  topicId={topicId}
                  programId={programId}
                  content={section}
                  onChange={(file) => setSection((prev) => ({ ...prev, type: 'image', data: { file } }))}
                />

              ) : null }
          </Box>
          <Box
            display="flex"
            alignItems="center"
          >
            <Button
              onClick={onSaveHandler}
              variant="contained"
            >
              {isUpdate ? 'Обновить запись' : 'Сохранить запись'}
            </Button>
            <Box flexGrow={1} />
            <Button onClick={onCancelHandler}>
              Отмена
            </Button>
          </Box>
        </CardContent>
      </Card>

    </>
  )
}

SectionCreate.propTypes = {
  initialValues: PropTypes.object,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  isUpdate: PropTypes.bool,
  topicId: PropTypes.string.isRequired,
  programId: PropTypes.string,
}

export default SectionCreate
