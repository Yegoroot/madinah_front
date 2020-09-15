import React, { useState, /* useEffect */ } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import ObjectID from 'bson-objectid'
import SunEditor from 'src/components/SunEditor'
import MdeEditor from 'src/components/MdeEditor'
import PictureType from 'src/components/Section/Item/PictureType'

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
    type: 'picture',
    title: 'Picture'
  }
]

function SectionCreate({
  initialValues, onCancel, onSave, isUpdate, topicId
}) {
  const defaultValues = {
    type: 'text',
    data: '',
    subtitle: ''
  }
  const [section, setSection] = useState(initialValues || defaultValues)

  const onSaveHandler = () => {
    const id = section.id ? section.id : ObjectID.generate() // если запись на update
    onSave({ record: { ...section, id } })
    setSection({ ...defaultValues })
  }

  const onCancelHandler = () => {
    onCancel(section.id)
    setSection({ ...defaultValues })
  }

  return (
    <>

      <Card>
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

            {section.type === 'picture'
              ? (
                <PictureType
                  topicId={topicId}
                  content={section.data}
                  onChange={(data) => setSection((prev) => ({ ...prev, type: 'picture', data }))}
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
}

export default SectionCreate
