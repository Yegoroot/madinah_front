import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import Label from 'src/components/Label'
import {
  Box,
  Card,
  IconButton,
  Link,
  SvgIcon,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import {
  Trash as TrashIcon,
  Edit as EditIcon,
} from 'react-feather'
import { PROGRAMS_URL } from 'src/constants'
import { deleteSeveralNotes } from 'src/slices/note'
// eslint-disable-next-line camelcase
import { perm_work_with_program, document_is_my_own } from 'src/utils/permissions'
import useAuth from 'src/hooks/useAuth'

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
  const dispatch = useDispatch()
  const classes = useStyles()
  const { user } = useAuth()
  const { role } = user

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('delete note and all content inside?')) {
      dispatch(deleteSeveralNotes({ id: note.id }))
    }
  }

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
          to={`${PROGRAMS_URL}/${programId}/topics/${topic.id}/notes/${note.id}`}
          variant="h3"
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
        {/* <Box
          pt={1}
        >
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {note.tags.map((tag) => (
              <Label key={tag}>
                {' '}
                {tag}
              </Label>
            ))}
          </Typography>
        </Box> */}

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

      { !document_is_my_own(user, topic.user._id) || !perm_work_with_program(role) ? null
        : (
          <>
            <Box
              py={2}
              pt={0}
              pl={2}
              pr={3}
              display="flex"
              alignItems="center"
            >

              <IconButton
                component={RouterLink}
                to={`${PROGRAMS_URL}/${programId}/topics/${topic.id}/notes/${note.id}/edit`}
              >
                <SvgIcon
                  fontSize="small"
                  color="inherit"
                  className={classes.edit}
                >
                  <EditIcon />
                </SvgIcon>
              </IconButton>
              <IconButton
                onClick={handleDelete}
              >
                <SvgIcon
                  fontSize="small"
                  color="error"
                  className={classes.delete}
                >
                  <TrashIcon />
                </SvgIcon>
              </IconButton>
            </Box>
          </>
        )}
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
