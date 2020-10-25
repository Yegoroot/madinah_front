import React from 'react'
import {
  Card, CardContent, Button, makeStyles, Grid, SvgIcon, TextField
} from '@material-ui/core'
import { Trash, Save } from 'react-feather'

const useStyles = makeStyles((theme) => ({
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  delete: {
    color: theme.palette.error.main,
  },

}))

const Form = ({
  values, onChange, onSave, onDelete
}) => {
  const classes = useStyles()
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
                  onClick={onSave}
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
                onChange={onChange}
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
                label="End"
                onChange={onChange}
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
            <TextField
              fullWidth
              label="Original"
              name="original"
              multiline
              className="ar"
              onChange={onChange}
              value={values.data.original || ''}
              variant="outlined"
            />
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
              onChange={onChange}
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
