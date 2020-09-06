import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  AppBar,
  Box,
  Hidden,
  Link,
  Toolbar,
  makeStyles,
} from '@material-ui/core'
import Logo from 'src/components/Logo'
import { THEMES } from 'src/constants'
import Settings from 'src/layouts/DashboardLayout/TopBar/Settings'

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...theme.name === THEMES.LIGHT ? {
      color: 'initial',
      backgroundColor: 'initial'
    } : {},
    ...theme.name === THEMES.ONE_DARK ? {
      backgroundColor: theme.palette.background.default
    } : {}
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2),
    }
  },
  toolbar: {
    minHeight: 64,
    justifyContent: 'flex-start'
  },

}))

const TopBar = ({
  className,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo className={classes.logo} />
          </RouterLink>
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        <Settings />
        <Box
          ml={2}
        >
          <Link
            className={classes.link}
            color="textSecondary"
            component={RouterLink}
            to="/app"
            underline="none"
            variant="body2"
          >
            Dashboard
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  className: PropTypes.string,
}

export default TopBar
