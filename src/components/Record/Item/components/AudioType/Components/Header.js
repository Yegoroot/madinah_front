import React from 'react'
import {
  Button, makeStyles, Grid, SvgIcon, Slider, Box
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { Play, Pause, Upload } from 'react-feather'

const useStyles = makeStyles((theme) => ({
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  playPause: {
    display: 'flex'
  },
  zoom: {
    padding: '0px 12px 12px'
  }
}))

const Header = ({
  isPlay, onPlay, onSaveChanges, isEdit, minValueSlider, valueSlider, handleSlider
}) => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (

    <Box mb={2}>
      <Grid
        container
        spacing={3}
        alignContent="center"
      >
        <Grid
          item
          className={classes.playPause}
        >
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
        {isEdit && (
        <Grid
          item
        >
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
            {t('components.save changes')}
          </Button>
        </Grid>
        )}

        {isEdit && (
        <Grid
          item
          container
          sm
          className={classes.zoom}
          xs={isEdit ? 12 : 8}
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
        )}
      </Grid>

    </Box>
  )
}

export default Header
