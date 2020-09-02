import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import Label from 'src/components/Label'
import {
  // Avatar,
  Box,
  Card,
  // CardMedia,
  // Divider,
  // Grid,
  IconButton,
  Link,
  SvgIcon,
  // Tooltip,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
// import { Rating } from '@material-ui/lab'
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import {
  // Users as UsersIcon,
  Trash as TrashIcon,
  Edit as EditIcon,
} from 'react-feather'
// import getInitials from 'src/utils/getInitials'
import { PUBLIC_PROGRAMS_URL, PROGRAMS_URL, /* IMAGES_BASE_URL */ } from 'src/constants'
import { deleteSeveralTopics } from 'src/slices/topic'
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

function TopicCard({
  data, className, topic, programId, ...rest
}) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { user } = useAuth()
  const role = user ? user.role : null

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('delete topic and all content inside?')) {
      dispatch(deleteSeveralTopics({ topicId: topic.id }))
    }
  }

  // const programPhoto = topic.photo ? topic.photo : 'no-photo.png'
  // const image = `${IMAGES_BASE_URL}/${programPhoto}`

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
        <Box
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
              {moment(topic.updatedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* <Box
        py={2}
        px={3}
      >
        <Grid
          alignItems="center"
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              variant="body2"
              color={topic.publish ? 'secondary' : 'inherit'}
            >
              {topic.publish ? 'Publish' : 'Unpublish'}
            </Typography>

          </Grid>
        </Grid>
      </Box> */}

      { !user || !document_is_my_own(user, topic.user._id) || !perm_work_with_program(role) ? null
        : (
          <>
            {/* <Divider /> */}
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
                to={`${PROGRAMS_URL}/${programId}/topics/${topic.id}/edit`}
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

TopicCard.propTypes = {
  className: PropTypes.string,
  topic: PropTypes.object.isRequired,
  programId: PropTypes.string.isRequired
}

export default TopicCard
