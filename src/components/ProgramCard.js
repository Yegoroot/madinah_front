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
import { PROGRAMS_URL, PUBLIC_PROGRAMS_URL, UPLOADS_URL } from 'src/constants'
import { deleteProgram } from 'src/slices/program'
// eslint-disable-next-line camelcase
import { perm_work_with_program, document_is_my_own } from 'src/utils/permissions'
import useAuth from 'src/hooks/useAuth'
import Type from 'src/components/Type'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%'
  },
  media: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    opacity: '0.4',
    backgroundColor: theme.palette.background.dark
  },
  box: {
    position: 'relative',
    zIndex: 1
  }
  // subscribersIcon: {
  //   marginLeft: theme.spacing(2),
  //   marginRight: theme.spacing(1)
  // }
}))

function ProgramCard({ program, className, ...rest }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { user } = useAuth()
  const role = user ? user.role : null
  const handleDelete = () => {
    if (window.confirm('delete program and all content inside?')) {
      dispatch(deleteProgram({ programId: program.id }))
    }
  }

  const image = program.photo
    ? `${UPLOADS_URL}/programs/${program.id}/photo/compress/${program.photo}`
    : null

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        p={3}
        className={classes.box}
      >
        <Link
          color="textPrimary"
          component={RouterLink}
          to={`${PUBLIC_PROGRAMS_URL}/${program.id}`}
          variant="h2"
        >
          {program.title}
        </Link>
        <Box pt={1}>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {program.description}
          </Typography>
        </Box>

        <Box pt={1}>
          {program.types.map((type) => (
            <Type
              color={type.color}
              key={type._id}
            >
              {type.title}
            </Type>
          ))}
        </Box>

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
      <CardMedia
        className={classes.media}
        image={image}
      />
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
