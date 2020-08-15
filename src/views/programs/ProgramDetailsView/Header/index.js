import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Link as RouterLink } from 'react-router-dom'
import moment from 'moment'
import {
  Box,
  Button,
  Grid,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core'
import {
  // Share2 as ShareIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Calendar as CalendarIcon,
  AlertTriangle as AlertIcon,
  // DollarSign as DollarSignIcon,
  // Send as SendIcon
} from 'react-feather'
import { PROGRAMS_URL } from 'src/constants'
import Application from './Application'

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

function Header({ program, className, ...rest }) {
  const classes = useStyles()
  const [openApplication, setOpenApplication] = useState(false)

  // const handleApplicationOpen = () => {
  //   setOpenApplication(true)
  // }

  const handleApplicationClose = () => {
    setOpenApplication(false)
  }

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          {program.title}
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
              {program.publish ? <CheckIcon /> : <AlertIcon /> }
            </SvgIcon>
            <Typography
              variant="body2"
              color="inherit"
              component="span"
            >
              {program.publish ? 'Active' : 'Inactive'}
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
              {`Ending ${moment(program.endDate).fromNow()}`}
            </Typography>
          </div>
          {/* <div className={classes.badge}>
            <SvgIcon
              fontSize="small"
              className={classes.badgeIcon}
            >
              <DollarSignIcon />
            </SvgIcon>
            <Typography
              variant="body2"
              color="inherit"
              component="span"
            >
              {`Budget: ${program.price}`}
            </Typography>
          </div> */}
        </Box>
      </Grid>
      <Grid item>
        <Button className={classes.action} component={RouterLink} to={`${PROGRAMS_URL}/${program.id}/edit`}>
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <EditIcon />
          </SvgIcon>
          Edit
        </Button>
        {/* <Button className={classes.action}>
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <ShareIcon />
          </SvgIcon>
          Share
        </Button>
        <Button
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
          Сказать свое мнение
        </Button> */}
        <Application
          user={program.user}
          onApply={handleApplicationClose}
          onClose={handleApplicationClose}
          open={openApplication}
        />
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  program: PropTypes.object.isRequired
}

Header.defaultProps = {}

export default Header
