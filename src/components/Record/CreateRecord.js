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
import SunEditor from 'src/components/SunEditor'
import MdeEditor from 'src/components/MdeEditor/index'

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
    type: 'audio',
    title: 'Аудио дорожка'
  }
]

function CreateRecord({ initialValues, onCancel, onSave }) {
  const defaultValues = {
    type: 'text',
    data: '',
    subtitle: ''
  }
  const [contentRecord, setContentRecord] = useState(initialValues || defaultValues)

  const onSaveHandler = () => {
    onSave({ ...contentRecord })
    setContentRecord({ ...defaultValues })
  }

  const onCancelHandler = () => {
    onCancel()
    setContentRecord({ ...defaultValues })
    // setIsShow(false)
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
                onChange={(event) => setContentRecord({ ...defaultValues, subtitle: contentRecord.subtitle, type: event.target.value })}
                select
                SelectProps={{ native: true }}
                value={contentRecord.type}
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
                onChange={(e) => setContentRecord({ ...contentRecord, subtitle: e.target.value })}
                name="subtitle"
                id="subtitle"
                value={contentRecord.subtitle}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box
            mt={3}
            mb={3}
          >
            {contentRecord.type === 'text'
              ? (
                <SunEditor
                  value={contentRecord.data}
                  content={contentRecord.data}
                  onChange={(data) => setContentRecord((prev) => ({ ...prev, type: 'text', data }))}
                />
              ) : null }
            {contentRecord.type === 'markdown'
              ? (
                <MdeEditor
                  value={contentRecord.data}
                  onChange={(data) => setContentRecord((prev) => ({ ...prev, type: 'markdown', data }))}
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
              Сохранить запись
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

export default CreateRecord
