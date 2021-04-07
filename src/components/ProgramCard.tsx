/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
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
  const hex5 = hexToRgb(`${theme.palette.background.default}d6`) // 63
  const hex3 = hexToRgb(`${theme.palette.background.default}63`) // 63
  const hex1 = hexToRgb(`${theme.palette.background.default}00`) // d4

  const deg = theme.direction === 'rtl' ? '-150deg' : '150deg'

  return {
    root: {
      position: 'relative',
      height: '100%',
      // '&:hover': {
      //   '& $media': {
      //     filter: 'none'
      //   }
      // }
    },
    media: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
      // // @ts-ignore
      // filter: theme.name === 'LIGHT' ? 'grayscale(1)' : 'none'
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
      fontWeight: 'bold',
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
    unpublish: {
      position: 'absolute',
      bottom: 25,
      right: 0,
      zIndex: 1,
      padding: '3px 15px',
      background: '#f44336',
      'border-radius': '4px 0px 0px 4px'
    },
    button: {
      backgroundColor: theme.palette.background.default
    },
    link: {
      'text-decoration': 'none',
      color: 'inherit'
    },
    edit: {
      backgroundColor: theme.palette.background.default,
      marginRight: theme.spacing(1)
    }

  }
})

function ProgramCard({ program, ...rest }: {program: any}): any {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const classes = useStyles()
  const { user } = useAuth()
  const { role } = user || { role: null }

  const handleDelete = (e: any) => {
    e.preventDefault()
    if (window.confirm(t('alert.do you want to delete program'))) {
      dispatch(deleteProgram({ programId: program.id }))
    }
  }

  const handleEdit = (e: any) => {
    e.preventDefault()
    history.push(`${PROGRAMS_URL}/${program.id}/edit`)
  }

  const image = program.photo
    ? `${UPLOADS_URL}/programs/${program.id}/photo/compress/${program.photo}`
    : ''

  // eslint-disable-next-line max-len
  const showHiddenMaterial = () => perm_work_with_program(role) && document_is_my_own(user, program.user)

  return (
    <Card
      className={clsx(classes.root)}
      {...rest}
    >
      <RouterLink
        to={`${PUBLIC_PROGRAMS_URL}/${program.id}`}
        className={classes.link}
      >

        {/* eslint-disable-next-line max-len */}
        {showHiddenMaterial() && !program.publish && <div className={classes.unpublish}>Unpublish</div> }

        <Box
          p={3}
          mb={4}
          className={classes.box}
        >

          <Box className={classes.mediaContent}>

            <Typography
              variant="h2"
              className={classes.title}
              color="textPrimary"
            >

              {program.title}
            </Typography>

            {program.description && (
            <Box pt={1}>
              <Typography
                color="textSecondary"
                variant="h5"
              >
                {program.description}
              </Typography>
            </Box>
            )}

            <Box pt={1}>
              {program.types.map((type: {color: string, _id: string, title: string}) => (
                <Type
                  color={type.color}
                  key={type._id}
                >
                  {type.title}
                </Type>
              ))}
              {program.language && <Type>{program.language}</Type>}
            </Box>
          </Box>

        </Box>
        <Box
          p={3}
          className={classes.buttons}
        >

          { showHiddenMaterial() && (
          <Box
            display="flex"
            alignItems="center"
          >
            <IconButton
              className={classes.edit}
              onClick={handleEdit}
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
              >
                <TrashIcon />
              </SvgIcon>
            </IconButton>
          </Box>
          )}
        </Box>
        <CardMedia
          className={classes.media}
          image={image}
        />

      </RouterLink>
    </Card>
  )
}

export default ProgramCard
