import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Button,
  Grid,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core'
import {
  PlusCircle as PlusCircleIcon,
} from 'react-feather'
import { Link as RouterLink } from 'react-router-dom'
import { PROGRAMS_URL } from 'src/constants'

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}))

function Header({ className, ...rest }) {
  const classes = useStyles()

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        {/* <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Link
            variant="body1"
            color="inherit"
            to="/app/management"
            component={RouterLink}
          >
            Management
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            Topics
          </Typography>
        </Breadcrumbs> */}
        <Typography
          variant="h1"
          color="textPrimary"
        >
          My Programs
        </Typography>
        {/* <Box mt={2}>
          <Button className={classes.action}>
            <SvgIcon
              fontSize="small"
              className={classes.actionIcon}
            >
              <UploadIcon />
            </SvgIcon>
            Import
          </Button>
          <Button className={classes.action}>
            <SvgIcon
              fontSize="small"
              className={classes.actionIcon}
            >
              <DownloadIcon />
            </SvgIcon>
            Export
          </Button>
        </Box> */}
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          className={classes.action}
          component={RouterLink}
          to={`${PROGRAMS_URL}/create`}
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <PlusCircleIcon />
          </SvgIcon>
          New Programs
        </Button>
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  className: PropTypes.string
}

export default Header
