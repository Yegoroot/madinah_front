import React from 'react'
import PropTypes from 'prop-types'
// import clsx from 'clsx'
import moment from 'moment'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Grid,
  SvgIcon,
  Breadcrumbs,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core'

import {
  Check as CheckIcon,
  Calendar as CalendarIcon,
  AlertTriangle as AlertIcon,
} from 'react-feather'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { PROGRAMS_URL } from 'src/constants'

const useStyles = makeStyles((theme) => ({
  root: {},
  badge: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2)
  },
  badgeIcon: {
    marginRight: theme.spacing(1)
  },
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

function Header({ note }) {
  const classes = useStyles()

  return (
    <>
      <Grid
        container
        spacing={3}
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              variant="body1"
              color="inherit"
              to={PROGRAMS_URL}
              component={RouterLink}
            >
              Programs
            </Link>
            <Link
              variant="body1"
              color="inherit"
              to={`${PROGRAMS_URL}/${note.topic.program.id}`}
              component={RouterLink}
            >
              {note.topic.program.title}
            </Link>
            <Link
              variant="body1"
              color="inherit"
              to={`${PROGRAMS_URL}/${note.topic.program.id}/topics/${note.topic.id}`}
              component={RouterLink}
            >
              {note.topic.title}
            </Link>
            <Typography
              variant="body1"
              color="textPrimary"
            >
              {note.title}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        justify="space-between"
      >
        <Grid item>
          <Typography
            variant="h1"
            color="textPrimary"
          >
            {note.title}
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            {note.description}
          </Typography>
          <Box
            mx={-2}
            display="flex"
            color="text.secondary"
            alignItems="center"
            flexWrap="wrap"
          >
            <div className={classes.badge}>
              <SvgIcon
                fontSize="small"
                className={classes.badgeIcon}
              >
                {note.publish ? <CheckIcon /> : <AlertIcon /> }
              </SvgIcon>
              <Typography
                variant="body2"
                color="inherit"
                component="span"
              >
                {note.publish ? 'Active' : 'Inactive'}
              </Typography>
            </div>
            <div className={classes.badge}>
              <SvgIcon
                fontSize="small"
                className={classes.badgeIcon}
              >
                <CalendarIcon />
              </SvgIcon>
              <Typography
                variant="body2"
                color="inherit"
                component="span"
              >
                {`Created ${moment(note.endDate).fromNow()}`}
              </Typography>
            </div>
          </Box>
        </Grid>

      </Grid>
    </>
  )
}

Header.propTypes = {
  note: PropTypes.object.isRequired,
}

Header.defaultProps = {}

export default Header
