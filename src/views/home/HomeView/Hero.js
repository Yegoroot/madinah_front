import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core'
import { APP_NAME } from 'src/constants'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 200,
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
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    '& > img': {
      maxWidth: '90%',
      height: 'auto'
    }
  }
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
              justifyContent="center"
              height="100%"
            >
              <Typography
                variant="overline"
                color="secondary"
              >
                {t('homepage.absolutlyfree')}
              </Typography>
              <Typography
                variant="h1"
                color="textPrimary"
              >
                {`${t('homepage.h1')} - ${APP_NAME}`}
              </Typography>
              <Box mt={3}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                >
                  {t('homepage.description')}
                </Typography>
              </Box>
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
