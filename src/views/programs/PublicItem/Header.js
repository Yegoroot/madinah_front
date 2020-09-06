import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { hexToRgb } from '@material-ui/core/styles'
import {
  Box,
  Container,
  Typography,
  Button,
  SvgIcon,
  makeStyles
} from '@material-ui/core'
import { IMAGES_BASE_URL, TOPICS_URL } from 'src/constants'
import { PlusCircle as PlusCircleIcon } from 'react-feather'
import { Link as RouterLink } from 'react-router-dom'
import { document_is_my_own } from 'src/utils/permissions'
import useAuth from 'src/hooks/useAuth'

const useStyles = makeStyles((theme) => {
  const hex1 = hexToRgb(`${theme.palette.background.dark}00`) // d4
  const hex2 = hexToRgb(`${theme.palette.background.dark}3d`) // 63
  const hex3 = hexToRgb(`${theme.palette.background.dark}7d`) // 63
  const hex4 = hexToRgb(`${theme.palette.background.dark}a6`) // 63
  const hex5 = hexToRgb(`${theme.palette.background.dark}`) // 63

  return {
    root: {
      position: 'relative',
    },
    actionIcon: {
      marginRight: theme.spacing(1)
    },
    button: {
      position: 'absolute',
      top: 30,
      right: 20
    },
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
        background: `linear-gradient(-180deg,  ${hex1} 40%,  ${hex2} 60%,  ${hex3} 70%, ${hex4} 85%, ${hex5} 100%)`
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
  }
})

const Header = ({ className, program, ...rest }) => {
  const classes = useStyles()

  const { user } = useAuth()
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
      {
        !user || !document_is_my_own(user, program.user._id) ? null
          : (
            <Box className={classes.button}>
              <Button
                color="secondary"
                variant="contained"
                className={classes.action}
                component={RouterLink}
                to={{
                  pathname: `${TOPICS_URL}/create`,
                  state: {
                    programId: program.id
                  }
                }}
              >
                <SvgIcon
                  fontSize="small"
                  className={classes.actionIcon}
                >
                  <PlusCircleIcon />
                </SvgIcon>
                add topic
              </Button>
            </Box>
          )
}
    </div>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  program: PropTypes.object.isRequired
}

export default Header
