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
import useAuth from 'src/hooks/useAuth'

import {
  Check as CheckIcon,
  Calendar as CalendarIcon,
  AlertTriangle as AlertIcon,
} from 'react-feather'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { PUBLIC_PROGRAMS_URL } from 'src/constants'
import { document_is_my_own } from 'src/utils/permissions'

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

function Header({ topic }) {
  const classes = useStyles()
  const { user, isAuthenticated } = useAuth()
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
              to={PUBLIC_PROGRAMS_URL}
              component={RouterLink}
            >
              Programs
            </Link>
            <Link
              variant="body1"
              color="inherit"
              to={`${PUBLIC_PROGRAMS_URL}/${topic.program.id}`}
              component={RouterLink}
            >
              {topic.program.title}
            </Link>
            <Typography
              variant="body1"
              color="textPrimary"
            >
              {topic.title}
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
            {topic.title}
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            {topic.description}
          </Typography>
          <Box
            mx={-2}
            display="flex"
            color="text.secondary"
            alignItems="center"
            flexWrap="wrap"
          >
            { !isAuthenticated || !document_is_my_own(user, topic.user._id) ? null
              : (
                <div className={classes.badge}>
                  <SvgIcon
                    fontSize="small"
                    className={classes.badgeIcon}
                  >
                    {topic.publish ? <CheckIcon /> : <AlertIcon /> }
                  </SvgIcon>
                  <Typography
                    variant="body2"
                    color="inherit"
                    component="span"
                  >
                    {topic.publish ? 'Active' : 'Inactive'}
                  </Typography>
                </div>
              )}
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
                {`Created ${moment(topic.endDate).fromNow()}`}
              </Typography>
            </div>
          </Box>
        </Grid>

      </Grid>
    </>
  )
}

Header.propTypes = {
  topic: PropTypes.object.isRequired,
}

Header.defaultProps = {}

export default Header
