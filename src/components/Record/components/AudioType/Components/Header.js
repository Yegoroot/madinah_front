/* eslint-disable react/prop-types */
import React from 'react'
import {
  Button, makeStyles, Grid, SvgIcon, Slider, Box
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

import { Play, Pause, Upload } from 'react-feather'

const useStyles = makeStyles((theme) => ({
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  marginBtn: {
    marginRight: theme.spacing(1)
  },
  playPause: {
    transform: theme.direction === 'rtl' ? 'scale(-1)' : 'scale(1)',
    display: 'flex',
  },
  zoom: {
    padding: '0px 12px 12px'
  }
}))

const Header = ({
  isPlay, onPlay, isEdit, minValueSlider, valueSlider, handleSlider
}) => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (

    <Box
      className={clsx({
        [classes.marginBottom]: isEdit,
        [classes.marginBtn]: !isEdit
      })}
    >
      <Grid
        container
        spacing={3}
        alignContent="center"
      >
        <Grid
          item
          className={clsx({
            [classes.playPause]: true,
            [classes.reverse]: !isEdit
          })}
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
