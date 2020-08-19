import React, { useState, /* useEffect */ } from 'react'
import AddOutlined from '@material-ui/icons/AddOutlined'
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

function CreateRecord({ content, onAddRecord }) {
  const [isShow, setIsShow] = useState(false)
  const [subtitle, setSubTitle] = useState('')
  const [typeRecord, setTypeRecord] = useState('text')
  const [contentRecord, setContentRecord] = useState({})

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

  // useEffect(() => {
  //   const initTopics = async () => {
  //     if (id) {

  //     }
  //   }
  //   initTopics()
  // }, [setInitialValue, id])

  const onReset = () => {

  }

  const changeContent = ({ type, data }) => {
    // set from editor record
    setContentRecord({
      type, data
    })
  }

  const onSave = () => {
    const common = {
      id: Date.now(),
      subtitle
    }
    onAddRecord({ ...contentRecord, ...common }) // inherit function
  }
  const onAdd = () => {
    if (isShow && window.confirm('Начать новую запись, текущее изминение будет потеряно')) {
      onSave()
      onReset()
    } else {
      setIsShow(true)
    }
  }
  const onCancel = () => {
    setIsShow(false)
  }

  return (
    <>

      {!isShow ? null : (
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
                  onChange={(event) => setTypeRecord(event.target.value)}
                  select
                  SelectProps={{ native: true }}
                  // value={initialValue.temp}
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
                  onChange={(e) => setSubTitle(e.target.value)}
                  name="option"
                  value={subtitle}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box
              mt={3}
              mb={3}
            >
              {typeRecord === 'text'
                ? (
                  <SunEditor
                    value={contentRecord.data}
                    // content={contentRecord.data}
                    onChange={(data) => {
                      changeContent({ type: 'text', data })
                    }}
                  />
                ) : null }
              {typeRecord === 'markdown'
                ? (
                  <MdeEditor
                    value={contentRecord.data}
                    // content={contentRecord.data}
                    onChange={(data) => {
                      changeContent({ type: 'markdown', data })
                    }}
                  />

                ) : null }
            </Box>

            <Button
              onClick={onCancel}
            >
              Отмена
            </Button>
            <Button
              onClick={onSave}
              variant="contained"
            >
              Сохранить
            </Button>
          </CardContent>
        </Card>
      )}

      <Box
        mt={3}
        mb={3}
      >
        <Button
          variant="contained"
          onClick={onAdd}
          startIcon={<AddOutlined />}
        >
          {isShow ? 'Добавить еще запись' : 'Добавить запись'}
        </Button>
      </Box>
    </>
  )
}

export default CreateRecord
