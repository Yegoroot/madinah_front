import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import {
  Box,
  Card,
  Link,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core'
import { PUBLIC_PROGRAMS_URL } from 'src/constants'

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 200,
    backgroundColor: theme.palette.background.dark
  },
  likedButton: {
    color: colors.red[600]
  },
  subscribersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1)
  }
}))

function NoteCard({
  data, className, note, topic, programId, ...rest
}) {
  const classes = useStyles()

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >

      <Box
        p={3}
      >
        <Link
          color="textPrimary"
          component={RouterLink}
          to={`${PUBLIC_PROGRAMS_URL}/${programId}/topics/${topic.id}/notes/${note.id}`}
          variant="h2"
        >
          {note.title}
        </Link>
        <Box
          pt={1}
        >
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {note.description}
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          mt={2}
        >
          <Box>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Created
              {' '}
              {moment(note.updatedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

NoteCard.propTypes = {
  className: PropTypes.string,
  note: PropTypes.object.isRequired,
  programId: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired
}

export default NoteCard
