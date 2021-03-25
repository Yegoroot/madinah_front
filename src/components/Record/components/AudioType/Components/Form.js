/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  Card, CardContent, Button, makeStyles, Grid, SvgIcon, TextField
} from '@material-ui/core'
import { Trash, Save } from 'react-feather'
import SunEditor from 'src/components/SunEditor'

const useStyles = makeStyles((theme) => ({
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  delete: {
    color: theme.palette.error.main,
  },

}))

const Form = ({
  onSave, onDelete, currentRegion
}) => {
  const classes = useStyles()

  const [content, setContent] = useState(currentRegion.data.original || '')
  console.log('RELOAD', content, currentRegion.data, currentRegion)

  const values = {
    start: Math.round(currentRegion.start * 10) / 10,
    end: Math.round(currentRegion.end * 10) / 10,
    data: { translate: currentRegion.data.translate }
  }

  const onSaveButton = () => {
    const start = Math.round(currentRegion.start * 10) / 10
    const end = Math.round(currentRegion.end * 10) / 10

    onSave({
      data: { original: content }, start, end
    })
  }

  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            container
            justify="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid
              item
              spacing={3}
              container
              lg={6}
              md={4}
              xs={12}
            >
              <Grid item>
                <Button
                  onClick={onSaveButton}
                  color="secondary"
                >
                  <SvgIcon
                    fontSize="small"
                    className={classes.actionIcon}
                  >
                    <Save />
                  </SvgIcon>
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  // className={classes.delete}
                  onClick={onDelete}
                >
                  <SvgIcon
                    // color="error"
                    fontSize="small"
                    className={classes.actionIcon}
                  >
                    <Trash />
                  </SvgIcon>
                  Delete
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              lg={3}
              md={4}
              xs={6}
            >
              <TextField
                fullWidth
                label="Start"
                name="start"
                type="number"
                disabled
                // onChange={onChange}
                value={values.start}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              lg={3}
              md={4}
              xs={6}
            >
              <TextField
                type="number"
                fullWidth
                disabled
                label="End"
                // onChange={onChange}
                value={values.end}
                name="end"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <SunEditor
              content={currentRegion.data.original || ''}
              onChange={setContent}
            />
            {/* <TextField
              fullWidth
              label="Original"
              name="original"
              multiline
              className="ar"
              onChange={onChange}
              value={values.data.original || ''}
              variant="outlined"
            /> */}
          </Grid>

          <Grid
            item
            xs={12}
          >
            <TextField
              fullWidth
              label="Translate"
              name="translate"
              multiline
              className="not-ar"
              // onChange={onChange}
              value={values.data.translate || ''}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>

    </Card>
  )
}

export default Form
