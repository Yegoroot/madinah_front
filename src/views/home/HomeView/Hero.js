import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Box,
  Container,
  Button,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LEVELS, PUBLIC_PROGRAMS_URL } from 'src/constants'

const setColorButton = (color) => ({
  color,
  borderColor: `${color}85`,
  '&:hover': {
    backgroundColor: `${color}14`,
    borderColor: color,
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 180,
    paddingBottom: 200,
    [theme.breakpoints.down('md')]: {
      paddingTop: 60,
      paddingBottom: 60
    }
  },
  image: {
    perspectiveOrigin: 'left center',
    transformStyle: 'preserve-3d',
    perspective: 1500,
    '& > img': {
      maxWidth: '90%',
      height: 'auto',
      transform: 'rotateY(-35deg) rotateX(15deg)',
      backfaceVisibility: 'hidden',
      boxShadow: theme.shadows[16]
    }
  },
  buttons: {
    marginBottom: theme.spacing(5),
    '&  a': {
      marginBottom: theme.spacing(1)
    }
  },
  title: {
    marginBottom: theme.spacing(3)
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    '& > img': {
      maxWidth: '90%',
      height: 'auto'
    }
  },
  // https://www.materialui.co/colors
  /**
   * Light 400
   * need Light 800
   */
  level0: setColorButton(theme.palette.rainbow.level0),
  level1: setColorButton(theme.palette.rainbow.level1),
  level2: setColorButton(theme.palette.rainbow.level2),
  level3: setColorButton(theme.palette.rainbow.level3),
  level4: setColorButton(theme.palette.rainbow.level4),
  level5: setColorButton(theme.palette.rainbow.level5),
}))

const Hero = ({ className, ...rest }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={5}
          >

            <Box
              display="flex"
              flexDirection="column"
              height="100%"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="end"
                className={classes.buttons}
              >
                <Typography
                  variant="h2"
                  color="textPrimary"
                  className={classes.title}
                >
                  {t('homepage.chooselevel')}
                </Typography>

                {
                LEVELS.map((level, i) => (
                  <Button
                    key={level}
                    component={RouterLink}
                    to={{
                      pathname: `${PUBLIC_PROGRAMS_URL}`,
                      // state: { level },
                      search: `level=${level}`
                    }}
                    variant="outlined"
                    className={classes[`level${i + 1}`]}
                  >
                    {t(`chips.${level}`)}
                  </Button>
                ))
                }
              </Box>

              <div>
                <Typography
                  variant="overline"
                  color="secondary"
                >
                  {t('homepage.stepbystep')}
                </Typography>
                <Typography
                  variant="h1"
                  color="textPrimary"
                >
                  {/* {`${t('homepage.h1')} - ${APP_NAME}`} */}
                  {`${t('homepage.h1')}`}
                </Typography>
                <Box mt={3}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                  >
                    {t('homepage.description')}
                  </Typography>
                </Box>

              </div>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
          >
            <Box position="relative">
              <div className={classes.shape}>
                <img
                  alt="Shapes"
                  src="/static/home/shapes.svg"
                />
              </div>
              <div className={classes.image}>
                <img
                  alt="Presentation"
                  src="/static/images/calligraphy/calligraphy8.jpg"
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

Hero.propTypes = {
  className: PropTypes.string
}

export default Hero
