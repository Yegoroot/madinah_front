import React, {
  useRef,
  useState
} from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { LogIn as LogInIcon } from 'react-feather'
import { useSnackbar } from 'notistack'
import {
  // Avatar,
  // Box,
  // ButtonBase,
  // Hidden,
  // Typography,
  Link,
  IconButton,
  SvgIcon,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core'
import useAuth from 'src/hooks/useAuth'
import Fingerprint from '@material-ui/icons/Fingerprint'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  // avatar: {
  //   height: 32,
  //   width: 32,
  //   marginRight: theme.spacing(1)
  // },
  popover: {
    width: 123
  },
  fingprint: {
    fontSize: '1.8rem'
  }
}))

const Account = () => {
  const classes = useStyles()
  const history = useHistory()
  const ref = useRef(null)
  const { /* user, */ logout, isAuthenticated } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const [isOpen, setOpen] = useState(false)
  const { t } = useTranslation()

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
        color="textPrimary"
        component={RouterLink}
        to="/login"
        underline="none"
        variant="body2"
      >
        <IconButton color="inherit">
          <SvgIcon fontSize="small">
            <LogInIcon />
          </SvgIcon>
        </IconButton>
      </Link>
    )
    : (
      <>
        <IconButton
          color="inherit"
          ref={ref}
          onClick={handleOpen}
        >
          <Fingerprint className={classes.fingprint} />
        </IconButton>
        {/* <Box
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
        </Box> */}
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
            {t('components.account.dashboard')}
          </MenuItem>
          {/* <MenuItem
            component={RouterLink}
            to="/app/account"
          >
            Account
          </MenuItem> */}
          <MenuItem onClick={handleLogout}>
            {t('components.account.logout')}
          </MenuItem>
        </Menu>
      </>
    )
}

export default Account
