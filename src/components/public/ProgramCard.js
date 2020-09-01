import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core'

import getInitials from 'src/utils/getInitials'
import { IMAGES_BASE_URL } from 'src/constants'

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 200,
    backgroundColor: theme.palette.background.dark
  },
  subscribersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1)
  }
}))

function ProgramCard({ program, className, ...rest }) {
  const classes = useStyles()
  const programPhoto = program.photo ? program.photo : 'no-photo.png'
  const image = `${IMAGES_BASE_URL}/${programPhoto}`

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Link
        component={RouterLink}
        to={`programs/${program.id}`}
      >
        <CardMedia
          className={classes.media}
          image={image}
        />
      </Link>
      <Box
        p={3}
        pb={1}
      >
        <Link
          color="textSecondary"
          component={RouterLink}
          to={`programs/${program.id}`}
          variant="h2"
        >
          {program.title}
        </Link>
        <Box
          pt={1}
        >
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {program.description}
          </Typography>
        </Box>
      </Box>
      <Box
        p={3}
        pt={0}
      >
        <Box
          display="flex"
          alignItems="center"
          mt={2}
        >
          <Avatar
            alt="User"
            src={program.user.photo}
          >
            {getInitials(program.user.name)}
          </Avatar>
          <Box ml={2}>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              by
              {' '}
              <Link
                color="textPrimary"
                component={RouterLink}
                to="#"
                variant="h6"
              >
                {program.user.name}
              </Link>
              {' '}
              | Updated
              {' '}
              {moment(program.updatedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>

    </Card>
  )
}

ProgramCard.propTypes = {
  className: PropTypes.string,
  program: PropTypes.object.isRequired
}

export default ProgramCard
