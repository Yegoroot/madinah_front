/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { hexToRgb } from '@material-ui/core/styles'
import {
  Box,
  Card,
  CardMedia,
  IconButton,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Trash as TrashIcon, Edit as EditIcon } from 'react-feather'
import { PROGRAMS_URL, PUBLIC_PROGRAMS_URL, UPLOADS_URL } from 'src/constants'
import { deleteProgram } from 'src/slices/program'
// eslint-disable-next-line camelcase
import { perm_work_with_program, document_is_my_own } from 'src/utils/permissions'
import useAuth from 'src/hooks/useAuth'
import Type from 'src/components/Type'

const useStyles = makeStyles((theme) => {
  const hex5 = hexToRgb(`${theme.palette.background.dark}d6`) // 63
  const hex3 = hexToRgb(`${theme.palette.background.dark}63`) // 63
  const hex1 = hexToRgb(`${theme.palette.background.dark}00`) // d4

  const deg = theme.direction === 'rtl' ? '-150deg' : '150deg'

  return {
    root: {
      position: 'relative',
      height: '100%',
    },
    media: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
    },
    box: {
      position: 'relative',
      zIndex: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      textDecoration: 'none',
      background: `linear-gradient(${deg},  ${hex5} 25%,  ${hex3} 60%,  ${hex1} 100%)`
    },
    title: {
      textDecoration: 'none',
      fontSize: '2.2rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: '2rem',
      },
    },
    mediaContent: {
      marginBottom: 70,
      [theme.breakpoints.down('xs')]: {
        marginBottom: 50,
      }
    },
    buttons: {
      position: 'absolute',
      bottom: 0,
      zIndex: 10
    },
    button: {
      backgroundColor: theme.palette.background.dark
    },
    edit: {
      backgroundColor: theme.palette.background.dark,
      marginRight: theme.spacing(1)
    }

  }
})

function ProgramCard({ program, ...rest }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const classes = useStyles()
  const { user } = useAuth()
  const role = user ? user.role : null
  const handleDelete = () => {
    if (window.confirm(t('alert.do you want to delete program'))) {
      dispatch(deleteProgram({ programId: program.id }))
    }
  }

  const image = program.photo
    ? `${UPLOADS_URL}/programs/${program.id}/photo/compress/${program.photo}`
    : null

  return (
    <Card
      className={clsx(classes.root)}
      {...rest}
    >
      <Box
        p={3}
        mb={4}
        className={classes.box}
        component={RouterLink}
        to={`${PUBLIC_PROGRAMS_URL}/${program.id}`}
      >

        <Box className={classes.mediaContent}>

          <Typography
            variant="h2"
            className={classes.title}
            color="textPrimary"
          >

            {program.title}
          </Typography>

          <Box pt={1}>
            <Typography
              color="textSecondary"
              variant="h5"
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
        </Box>

      </Box>
      <Box
        p={3}
        className={classes.buttons}
      >

        { !perm_work_with_program(role) || !document_is_my_own(user, program.user) ? null
          : (
            <div>
              <Box
                display="flex"
                alignItems="center"
              >

                <IconButton
                  component={RouterLink}
                  className={classes.edit}
                  to={`${PROGRAMS_URL}/${program.id}/edit`}
                >
                  <SvgIcon
                    fontSize="small"
                    color="inherit"
                  >
                    <EditIcon />
                  </SvgIcon>
                </IconButton>
                <IconButton
                  className={classes.button}
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
            </div>
          )}
      </Box>
      <CardMedia
        component={RouterLink}
        to={`${PUBLIC_PROGRAMS_URL}/${program.id}`}
        className={classes.media}
        image={image}
      />
    </Card>
  )
}

ProgramCard.propTypes = {
  className: PropTypes.string,
  program: PropTypes.object.isRequired
}

export default ProgramCard
