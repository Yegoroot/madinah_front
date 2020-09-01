import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Link as RouterLink } from 'react-router-dom'
import moment from 'moment'
import {
  Box,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  Breadcrumbs,
  // CardContent, Card,
  makeStyles
} from '@material-ui/core'
import Label from 'src/components/Label'
import NoteCard from 'src/components/NoteCard'
import {
  Share2 as ShareIcon,
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

function Header({ topic, className, ...rest }) {
  const classes = useStyles()

  const tags = () => {
    if (!topic.tags.length) return null

    return topic.tags.map((tag) => (

      <Label key={tag}>
        {tag}
        &nbsp;
      </Label>
    ))
  }

  return (
    <>

      <Grid
        container
        spacing={3}
        justify="space-between"
        alignItems="center"
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Grid item>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              variant="body1"
              color="inherit"
              to={`${PROGRAMS_URL}`}
              component={RouterLink}
            >
              Programs
            </Link>
            <Link
              variant="body1"
              color="inherit"
              to={`${PROGRAMS_URL}/${topic.program ? topic.program.id : PROGRAMS_URL}`}
              component={RouterLink}
            >
              {`${topic.program ? topic.program.title : 'none'}`}
            </Link>
            <Typography
              variant="body1"
              color="textPrimary"
            >
              {topic.title}
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Button className={classes.action}>
            <SvgIcon
              fontSize="small"
              className={classes.actionIcon}
            >
              <ShareIcon />
            </SvgIcon>
            Share
          </Button>
          {/* <Button
          className={classes.action}
          onClick={handleApplicationOpen}
          variant="contained"
          color="secondary"
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <SendIcon />
          </SvgIcon>
          Apply for a role
        </Button>
        <Application
          author={topic.author}
          onApply={handleApplicationClose}
          onClose={handleApplicationClose}
          open={openApplication}
        /> */}
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
            {/* <div className={classes.badge}>
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
                {`Updated ${moment(topic.updatedAt).fromNow()}`}
              </Typography>
            </div> */}
          </Box>
        </Grid>
      </Grid>

      <Box
        mb={3}
        display="flex"
        color="text.secondary"
        alignItems="center"
        flexWrap="wrap"
      >
        {tags()}
      </Box>
    </>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  topic: PropTypes.object.isRequired
}

Header.defaultProps = {}

export default Header
