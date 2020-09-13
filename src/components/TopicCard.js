import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Box,
  IconButton,
  Link,
  SvgIcon,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core'
import {
  Edit as EditIcon,
} from 'react-feather'
import { PUBLIC_PROGRAMS_URL, TOPICS_URL } from 'src/constants'
import { perm_work_with_program, document_is_my_own } from 'src/utils/permissions'
import useAuth from 'src/hooks/useAuth'

const useStyles = makeStyles((theme) => ({
  root: {},
  topic: {
    transition: '0.3s',
    '&:hover': {
      backgroundColor: theme.palette.background.paper
    }
  },
  likedButton: {
    color: colors.red[600]
  },
  subscribersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1)
  }
}))

function TopicCard({
  data, className, topic, programId, ...rest
}) {
  // const dispatch = useDispatch()
  const classes = useStyles()
  const { user } = useAuth()
  const role = user ? user.role : null

  // const handleDelete = () => {
  //   // eslint-disable-next-line no-restricted-globals
  //   if (confirm('delete topic and all content inside?')) {
  //     dispatch(deleteTopic({ topicId: topic.id }))
  //   }
  // }

  return (
    <div className={classes.topic}>

      <Box
        p={3}
      >
        <Link
          color="textPrimary"
          component={RouterLink}
          to={`${PUBLIC_PROGRAMS_URL}/${programId}/topics/${topic.id}`}
          variant="h2"
        >
          {topic.title}
        </Link>
        <Box
          pt={1}
        >
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {topic.description}
          </Typography>
        </Box>
        {/* <Box
          pt={1}
        >
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {topic.tags.map((tag) => (
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
              {moment(topic.updatedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>

      { !user || !document_is_my_own(user, topic.user._id) || !perm_work_with_program(role) ? null
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
                to={`${TOPICS_URL}/${topic.id}/edit`}
              >
                <SvgIcon
                  fontSize="small"
                  color="inherit"
                  className={classes.edit}
                >
                  <EditIcon />
                </SvgIcon>
              </IconButton>
              {/* <IconButton
                onClick={handleDelete}
              >
                <SvgIcon
                  fontSize="small"
                  color="error"
                  className={classes.delete}
                >
                  <TrashIcon />
                </SvgIcon>
              </IconButton> */}
            </Box>
          </>
        )}
    </div>
  )
}

TopicCard.propTypes = {
  className: PropTypes.string,
  topic: PropTypes.object.isRequired,
  programId: PropTypes.string.isRequired
}

export default TopicCard
