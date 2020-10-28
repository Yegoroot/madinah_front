/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
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
  Button,
  Hidden,
  IconButton,
  Typography,
  makeStyles
} from '@material-ui/core'
import useAuth from 'src/hooks/useAuth'
import { PUBLIC_PROGRAMS_URL, TOPICS_URL } from 'src/constants'
import {
  Check as CheckIcon,
  Calendar as CalendarIcon,
  AlertTriangle as AlertIcon,
  Share2 as ShareIcon,
  Edit as EditIcon,
} from 'react-feather'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import { document_is_my_own, perm_work_with_program } from 'src/utils/permissions'
import { onShare } from 'src/utils/urls'

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
        <Hidden lgUp>
          <Grid item>
            <Button
              className={classes.action}
              onClick={() => onShare(`${topic.id}`)}
            >
              <SvgIcon
                fontSize="small"
                className={classes.actionIcon}
              >
                <ShareIcon />
              </SvgIcon>
              Share
            </Button>
          </Grid>
        </Hidden>
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
            { !user || !document_is_my_own(user, topic.user._id) || !perm_work_with_program(user.role) ? null
              : (
                <>
                  <IconButton
                    component={RouterLink}
                    to={`${TOPICS_URL}/${topic.id}/edit`}
                  >
                    <SvgIcon
                      fontSize="small"
                      color="inherit"
                    >
                      <EditIcon />
                    </SvgIcon>
                  </IconButton>
                </>
              )}
          </Typography>

          <Typography
            variant="h5"
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
                {`Created ${moment(topic.createdAt).fromNow()}`}
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
