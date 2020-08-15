import React, { useState, /* useEffect */ } from 'react'
import AddOutlined from '@material-ui/icons/AddOutlined'
import {
  Box,
  Button,
  // Select,
  // InputLabel,
  // Input,
  // FormControl,
  // MenuItem,
  Card,
  CardContent,
  CardHeader,
  Divider,
  // FormControlLabel,
  // Switch,
  // FormHelperText,
  Grid,
  // Paper,
  TextField,
  // Typography,
  // makeStyles,
  // IconButton,
  // Chip,
  // SvgIcon,
} from '@material-ui/core'
import SunEditor from 'src/components/Editor/Editor'
import { contentTypes } from 'src/constants'


function ListRecords({ content }) {
  // const classes = useStyles()
  // const { id } = match.params
  const [initialValue, setInitialValue] = useState({
    type: 'text',
    content: [],
    temp: ''
  })

  // useEffect(() => {
  //   const initTopics = async () => {
  //     if (id) {

  //     }
  //   }
  //   initTopics()
  // }, [setInitialValue, id])

  const handleChange = (e) => {

  }
  const setSunEditorValue = (e) => {

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
                onChange={(event) => handleChange(event.target.value)}
                select
                SelectProps={{ native: true }}
                value={initialValue.temp}
                variant="outlined"
              >
                {contentTypes.map(({ type, title }) => (
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

                name="option"
                value={initialValue.temp}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box mt={3} mb={3}>
            {/* <Paper variant="outlined"> */}
            <SunEditor
              value={initialValue.temp}
              content={initialValue.temp}
              onChange={(value) => {
                setSunEditorValue('content', value)
              }}
            />
            {/* </Paper> */}
          </Box>

          <Button>
            Отмена
          </Button>
          <Button
            variant="contained"
          >
            Сохранить
          </Button>
        </CardContent>
      </Card>

      <Box mt={3} mb={3}>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
        >
          Добавить запись
        </Button>
      </Box>
    </>
  )
}


export default ListRecords
