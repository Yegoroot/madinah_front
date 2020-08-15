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
import { Rating } from '@material-ui/lab'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import {
  // Users as UsersIcon,
  Trash as TrashIcon,
  Edit as EditIcon,
} from 'react-feather'
import getInitials from 'src/utils/getInitials'
import { PROGRAMS_URL, IMAGES_BASE_URL } from 'src/constants'

import { deleteProgram } from 'src/logic/programs'

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

function ProgramCard({ program, className, ...rest }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isLiked, setLiked] = useState(program.isLiked)
  // const [likes, setLikes] = useState(program.likes)

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
    if (confirm('delete program and all content inside?')) {
      dispatch(deleteProgram({ id: program.id }))
    }
  }

  const programPhoto = program.photo ? program.photo : 'no-photo.png'
  const image = `${IMAGES_BASE_URL}/${programPhoto}`

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box p={3}>
        <CardMedia
          className={classes.media}
          image={image}
        />
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
            <Link
              color="textPrimary"
              component={RouterLink}
              to={`${PROGRAMS_URL}/${program.id}`}
              variant="h5"
            >
              {program.title}
            </Link>
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
      <Box
        pb={2}
        px={3}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {program.description}
        </Typography>
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
          {/* <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              {program.location}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Location
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              {program.type}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Type
            </Typography>
          </Grid> */}
          <Grid item>

            {/* <Typography
                variant="h5"
                color="textPrimary"
              >
                {program.publish}
              </Typography> */}
            <Typography
              variant="body2"
              color={program.publish ? 'secondary' : 'inherit'}
            >
              {program.publish ? 'Publish' : 'Unpublish'}
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
          to={`${PROGRAMS_URL}/${program.id}/edit`}
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
        {/* <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {likes}
        </Typography>
        <SvgIcon
          fontSize="small"
          color="action"
          className={classes.subscribersIcon}
        >
          <UsersIcon />
        </SvgIcon>
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {program.subscribers}
        </Typography> */}
        <Box flexGrow={1} />
        <Rating
          value={program.rating}
          size="small"
          readOnly
        />
      </Box>
    </Card>
  )
}

ProgramCard.propTypes = {
  className: PropTypes.string,
  program: PropTypes.object.isRequired
}

export default ProgramCard
