import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  SvgIcon,
  Tooltip,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
// import { Rating } from '@material-ui/lab'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import {
  // Users as UsersIcon,
  Trash as TrashIcon,
  Edit as EditIcon,
} from 'react-feather'
import getInitials from 'src/utils/getInitials'
import { PROGRAMS_URL, TOPICS_URL, IMAGES_BASE_URL } from 'src/constants'
import { deleteSeveralTopics } from 'src/slices/topic'

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
  const [isLiked, setLiked] = useState(topic.isLiked)
  // const [likes, setLikes] = useState(data.likes)

  console.log(programId)

  const handleLike = () => {
    setLiked(true)
    // setLikes((prevLikes) => prevLikes + 1)
  }

  const handleUnlike = () => {
    setLiked(false)
    // setLikes((prevLikes) => prevLikes - 1)
  }

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('delete topic and all content inside?')) {
      dispatch(deleteSeveralTopics({ id: topic.id }))
    }
  }

  const programPhoto = topic.photo ? topic.photo : 'no-photo.png'
  const image = `${IMAGES_BASE_URL}/${programPhoto}`

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Link
        color="textPrimary"
        component={RouterLink}
        to={`${PROGRAMS_URL}/${programId}/topics/${topic.id}`}
        variant="h5"
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
          color="textPrimary"
          component={RouterLink}
          to={`${PROGRAMS_URL}/${programId}/topics/${topic.id}`}
          variant="h3"
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
            src={topic.user.photo}
          >
            {getInitials(topic.user.name)}
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
                {topic.user.name}
              </Link>
              {' '}
              | Updated
              {' '}
              {moment(topic.updatedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
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
      </Box>
      <Divider />
      <Box
        py={2}
        pl={2}
        pr={3}
        display="flex"
        alignItems="center"
      >
        {isLiked ? (
          <Tooltip title="Unlike">
            <IconButton
              className={classes.likedButton}
              onClick={handleUnlike}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Like">
            <IconButton onClick={handleLike}>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

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
        {/* <Box flexGrow={1} />
        <Rating
          value={topic.rating}
          size="small"
          readOnly
        /> */}
      </Box>
    </Card>
  )
}

TopicCard.propTypes = {
  className: PropTypes.string,
  topic: PropTypes.object.isRequired,
  programId: PropTypes.string.isRequired
}

export default TopicCard
