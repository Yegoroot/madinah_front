import React from 'react'
// import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Box,
  // Button,
  Container,
  // Hidden,
  Typography,
  // IconButton,
  // Tooltip,
  makeStyles
} from '@material-ui/core'
// import MoreIcon from '@material-ui/icons/MoreVert'
import { IMAGES_BASE_URL } from 'src/constants'

const useStyles = makeStyles((theme) => ({
  root: {},
  cover: {
    position: 'relative',
    height: 400,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:before': {
      position: 'absolute',
      content: '" "',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage: 'linear-gradient(-180deg, rgb(28 32 37 / 0%) 40%, rgb(28 32 37 / 24%) 60%, rgb(28 32 37 / 49%) 70%, rgb(28 32 37 / 65%) 85%, rgb(28 32 37) 100%)'
    },
  },
  title: {
    position: 'absolute',
    top: -130,
    left: -20,
    padding: 20
  },
  action: {
    marginLeft: theme.spacing(1)
  }
}))

const Header = ({
  className, program, ...rest
}) => {
  const classes = useStyles()

  const backgroundImage = program.photo ? `url(${IMAGES_BASE_URL}/${program.photo})` : null

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <div
        className={classes.cover}
        style={{ backgroundImage }}
      />
      <Container maxWidth="lg">
        <Box
          position="relative"
          mt={1}
          display="flex"
          alignItems="center"
        >

          <Box className={classes.title}>
            <Typography
              variant="h1"
              color="textSecondary"
            >
              {program.title}
            </Typography>
            <Typography
              variant="h4"
              color="textPrimary"
            >
              {program.description}
            </Typography>
          </Box>

        </Box>
      </Container>
    </div>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  program: PropTypes.object.isRequired
}

export default Header
