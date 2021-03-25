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
  const [original, setContent] = useState(currentRegion.data.original || '')

  const start = Math.round(currentRegion.start * 10) / 10
  const end = Math.round(currentRegion.end * 10) / 10

  const onSaveButton = () => {
    // console.log({ data: { original }, start, end })
    onSave({
      data: { original }, start, end
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
                value={start}
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
                value={end}
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
          </Grid>
        </Grid>
      </CardContent>

    </Card>
  )
}

export default Form
