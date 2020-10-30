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
// import { APP_NAME } from 'src/constants'
import { useTranslation } from 'react-i18next'

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
    '& button': {
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
  level1: {
    color: theme.palette.rainbow.level1,
    borderColor: `${theme.palette.rainbow.level1}85`,
    '&:hover': {
      backgroundColor: `${theme.palette.rainbow.level1}14`,
      borderColor: theme.palette.rainbow.level1,
    }
  },
  level2: {
    color: theme.palette.rainbow.level2,
    borderColor: `${theme.palette.rainbow.level2}85`,
    '&:hover': {
      backgroundColor: `${theme.palette.rainbow.level2}14`,
      borderColor: theme.palette.rainbow.level2,
    }
  },
  level3: {
    color: theme.palette.rainbow.level3,
    borderColor: `${theme.palette.rainbow.level3}85`,
    '&:hover': {
      backgroundColor: `${theme.palette.rainbow.level3}14`,
      borderColor: theme.palette.rainbow.level3,
    }
  },
  level4: {
    color: theme.palette.rainbow.level4,
    borderColor: `${theme.palette.rainbow.level4}85`,
    '&:hover': {
      backgroundColor: `${theme.palette.rainbow.level4}14`,
      borderColor: theme.palette.rainbow.level4,
    }
  },
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
                <Button
                  variant="outlined"
                  className={classes.level1}
                >
                  {t('homepage.begginer')}
                </Button>
                <Button
                  className={classes.level2}
                  variant="outlined"
                >
                  {t('homepage.preintermeiate')}
                </Button>
                <Button
                  className={classes.level3}
                  variant="outlined"
                >
                  {t('homepage.intermeiate')}
                </Button>
                <Button
                  className={classes.level4}
                  variant="outlined"
                >
                  {t('homepage.upperintermeiate')}
                </Button>
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
