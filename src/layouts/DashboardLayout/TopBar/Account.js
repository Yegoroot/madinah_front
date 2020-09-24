import React, {
  useRef,
  useState
} from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'

import { useSnackbar } from 'notistack'
import {
  Avatar,
  Box,
  ButtonBase,
  Hidden,
  Link,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core'
import useAuth from 'src/hooks/useAuth'

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  },
  // box: {
  //   color: theme.palette.text.secondary,
  // },
  link: {
    // color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(1),
    }
  },
}))

const Account = () => {
  const classes = useStyles()
  const history = useHistory()
  const ref = useRef(null)
  const { user, logout, isAuthenticated } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = async () => {
    try {
      handleClose()
      await logout()
      history.push('/')
    } catch (err) {
      console.error(err)
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      })
    }
  }

  return !isAuthenticated
    ? (
      <Link
        className={classes.link}
        color="textPrimary"
        component={RouterLink}
        to="/login"
        underline="none"
        variant="body2"
      >
        Login
      </Link>
    )
    : (
      <>
        <Box
          display="flex"
          alignItems="center"
          component={ButtonBase}
          onClick={handleOpen}
          className={classes.box}
          ref={ref}
        >
          <Avatar
            alt="User"
            className={classes.avatar}
            src={user.avatar}
          />
          <Hidden smDown>
            <Typography
              variant="h6"
              color="inherit"
            >
              {user.name}
            </Typography>
          </Hidden>
        </Box>
        <Menu
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          keepMounted
          PaperProps={{ className: classes.popover }}
          getContentAnchorEl={null}
          anchorEl={ref.current}
          open={isOpen}
        >
          <MenuItem
            component={RouterLink}
            to="/app/programs"
          >
            Dashboard
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/app/account"
          >
            Account
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </>
    )
}

export default Account
