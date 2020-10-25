import React from 'react'
import {
  Button, makeStyles, Grid, SvgIcon, Slider, Box
} from '@material-ui/core'

import { Play, Pause, Upload } from 'react-feather'

const useStyles = makeStyles((theme) => ({
  actionIcon: {
    marginRight: theme.spacing(1)
  },
}))

const Header = ({
  isPlay, onPlay, onSaveChanges, minValueSlider, valueSlider, handleSlider
}) => {
  const classes = useStyles()
  return (

    <Box mb={2}>
      <Grid
        container
        spacing={3}
        alignContent="center"
      >
        <Grid item>
          {!isPlay ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={onPlay}
            >
              <SvgIcon fontSize="small">
                <Play />
              </SvgIcon>
              {/* Play */}
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={onPlay}
              color="secondary"
            >
              <SvgIcon fontSize="small">
                <Pause />
              </SvgIcon>
              {/* Pause */}
            </Button>
          )}
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onSaveChanges}
          >
            <SvgIcon
              fontSize="small"
              className={classes.actionIcon}
            >
              <Upload />
            </SvgIcon>
            Save Changes
          </Button>
        </Grid>
        <Grid
          item
          container
          xs
          alignItems="center"
        >
          <Slider
            min={minValueSlider}
            max={500}
            value={valueSlider}
            className={classes.slider}
            onChange={handleSlider}
            aria-labelledby="continuous-slider"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Header
