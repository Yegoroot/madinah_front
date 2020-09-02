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
  Divider,
  IconButton,
  Link,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { Trash as TrashIcon, Edit as EditIcon } from 'react-feather'
import getInitials from 'src/utils/getInitials'
import { PROGRAMS_URL, PUBLIC_PROGRAMS_URL, IMAGES_BASE_URL } from 'src/constants'
import { deleteProgram } from 'src/slices/program'
// eslint-disable-next-line camelcase
import { perm_work_with_program, document_is_my_own } from 'src/utils/permissions'
import useAuth from 'src/hooks/useAuth'

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
  const dispatch = useDispatch()
  const classes = useStyles()
  const { user } = useAuth()
  const role = user ? user.role : null
  const handleDelete = () => {
    if (window.confirm('delete program and all content inside?')) {
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
      <Link
        color="textPrimary"
        component={RouterLink}
        to={`${PUBLIC_PROGRAMS_URL}/${program.id}`}
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
          to={`${PUBLIC_PROGRAMS_URL}/${program.id}`}
          variant="h3"
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
              | Created
              {' '}
              {moment(program.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>

      { !perm_work_with_program(role) || !document_is_my_own(user, program.user._id) ? null
        : (
          <>
            <Divider />
            <Box
              py={2}
              pl={2}
              pr={3}
              display="flex"
              alignItems="center"
            >

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
            </Box>
          </>
        )}
    </Card>
  )
}

ProgramCard.propTypes = {
  className: PropTypes.string,
  program: PropTypes.object.isRequired
}

export default ProgramCard
