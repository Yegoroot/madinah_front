import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  AppBar,
  Box,
  Button,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  SvgIcon
} from '@material-ui/core'
import { Menu as MenuIcon } from 'react-feather'
import Logo from 'src/components/Logo'
import { THEMES } from 'src/constants'
import { useTranslation } from 'react-i18next'
import Account from './Account'
// import Search from './Search'
import Settings from './Settings'
import { useStyles } from './style'

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <Logo className={classes.logo} />
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        <Button
          className={classes.programs}
          component={RouterLink}
          to="/programs"
          variant="outlined"
        >
          {t('menu.programs')}
        </Button>

        <Settings />
        <Account />

      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
}

TopBar.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onMobileNavOpen: () => {}
}

export default TopBar
