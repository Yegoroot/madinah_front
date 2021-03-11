/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { hexToRgb } from '@material-ui/core/styles'
import {
  Box,
  Container,
  Typography,
  Hidden,
  Button,
  SvgIcon,
  makeStyles
} from '@material-ui/core'
import { UPLOADS_URL, TOPICS_URL, API_BASE_URL } from 'src/constants'
import {
  PlusCircle as PlusCircleIcon,
  Share2 as ShareIcon,
} from 'react-feather'
import { Link as RouterLink } from 'react-router-dom'
import { document_is_my_own } from 'src/utils/permissions'
import useAuth from 'src/hooks/useAuth'
import { onShare } from 'src/utils/urls'
import Type from 'src/components/Type'
import ModalOrder from 'src/components/Draggble/Modal'
import Parallax from 'src/components/Animate/Parallax/Parallax'
import { instanceAxios as axios } from 'src/utils/axios'
import { useDispatch } from 'react-redux'
import { getProgramItemRequest } from 'src/slices/program'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => {
  const hex1 = hexToRgb(`${theme.palette.background.dark}00`) // d4
  const hex2 = hexToRgb(`${theme.palette.background.dark}3d`) // 63
  const hex3 = hexToRgb(`${theme.palette.background.dark}7d`) // 63
  const hex4 = hexToRgb(`${theme.palette.background.dark}a6`) // 63
  const hex5 = hexToRgb(`${theme.palette.background.dark}`) // 63

  // const hightLight = [
  //   hexToRgb(`${theme.palette.background.dark}0`),
  //   hexToRgb(`${theme.palette.background.dark}`),
  //   hexToRgb(`${theme.palette.background.dark}80`),
  //   hexToRgb(`${theme.palette.background.dark}1a`),
  //   hexToRgb(`${theme.palette.background.dark}b3`),
  //   hexToRgb(`${theme.palette.background.dark}00`),
  //   hexToRgb(`${theme.palette.background.dark}00`),
  //   hexToRgb(`${theme.palette.background.dark}4d`),
  //   hexToRgb(`${theme.palette.background.dark}00)`)
  // ]

  return {
    root: {
      position: 'relative',
    },
    actionIcon: {
      marginRight: theme.spacing(1)
    },
    description: {
      marginTop: theme.spacing(2)
    },
    button: {
      position: 'absolute',
      top: 30,
      right: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    cover: {
      position: 'absolute',
      width: '100%',
      '&:before': {
        position: 'absolute',
        content: '" "',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: `linear-gradient(-180deg,  
          ${hex1} 40%,  
          ${hex2} 60%,  
          ${hex3} 70%, 
          ${hex4} 85%, 
          ${hex5} 100%)`
      },
    },
    content: {
      position: 'relative',
      paddingTop: 150,
      marginBottom: 50
    },
    action: {
      color: theme.palette.text.primary,
    },
    h1: {
      lineHeight: '1.4',
      fontSize: 50,
      color: '#fff',
      // color: theme.palette.background.default,
      maxWidth: '100%',
      marginRight: theme.spacing(1),
      left: -10,
      'font-weight': 'bolder',
      // background: `linear-gradient(
      //       104deg, ${hightLight[0]} 0.9%,
      //       ${hightLight[1]} 2.4%,
      //       ${hightLight[2]} 5.8%,
      //       ${hightLight[3]} 93%,
      //       ${hightLight[4]} 96%,
      //       ${hightLight[5]} 98%),
      //     linear-gradient(
      //       183deg, ${hightLight[6]} 0%,
      //       ${hightLight[7]} 7.9%,
      //       ${hightLight[7]} 15%)
      //     `,
      padding: '0.1em 0px',
      '-webkit-box-decoration-break': 'clone',
      margin: 0,
      'border-radius': 7.5,
      // eslint-disable-next-line max-len
      'text-shadow': '12px 12px 9.8px rgb(28 32 37), 21px -18.1px 7.3px rgb(255 255 255 / 52%), -18.1px -27.3px 30px rgb(255 255 255 / 63%)',
    },
    // header: {
    //   display: 'flex',
    //   'align-items': 'center',
    //   'flex-wrap': 'wrap',
    //   'justify-content': 'space-between'
    // }
  }
})

const Header = ({
  className, program, topics, ...rest
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = useStyles()
  const { user } = useAuth()
  const backgroundImage = program.photo
    ? `url(${UPLOADS_URL}/programs/${program.id}/photo/compress/${program.photo})`
    : null

  const onUpdateOrder = async (items) => {
    console.log(items)
    const data = {
      topics: items.map((topic, index) => ({ _id: topic._id, sequence: index }))
    }
    await axios.post(`${API_BASE_URL}/topics/order`, data)
      .then(() => {
        dispatch(getProgramItemRequest({ programId: program._id }))
      })
  }

  // console.log(topics)
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Parallax
        className={classes.cover}
        image={backgroundImage}
        // filter
        small
      />
      <div className={classes.content}>
        {/* <Container maxWidth="lg"> */}
        <Container>
          <Box
            position="relative"
            display="flex"
            flexDirection="column"
          >

            <div className={classes.header}>
              <h1 className={classes.h1}>
                {program.title}
              </h1>
              <Hidden lgUp>
                <Button
                  className={classes.action}
                  // variant="contained"
                  onClick={() => onShare(`${program.id}`)}
                >
                  <SvgIcon
                    fontSize="small"
                    className={classes.actionIcon}
                  >
                    <ShareIcon />
                  </SvgIcon>
                  {t('components.share')}
                </Button>
              </Hidden>
            </div>

            <Typography
              variant="h5"
              className={classes.description}
              color="textPrimary"
            >
              {program.description}
            </Typography>

          </Box>

          <Box mx={-1}>
            {program.types.map((_type) => (
              <Type
                color={_type.color}
                key={_type._id}
              >
                {_type.title}
              </Type>
            ))}
          </Box>

        </Container>
      </div>
      {
        !user || !document_is_my_own(user, program.user) ? null
          : (
            <Box className={classes.button}>
              <Button
                color="primary"
                variant="contained"
                component={RouterLink}
                to={{
                  pathname: `${TOPICS_URL}/create`,
                  state: {
                    programId: program.id
                  }
                }}
              >
                <SvgIcon
                  fontSize="small"
                  className={classes.actionIcon}
                >
                  <PlusCircleIcon />
                </SvgIcon>
                {t('pageProgram.add topic')}
              </Button>

              {!(topics.length > 2) ? null
                : (
                  <ModalOrder
                    contents={topics}
                    onUpdate={onUpdateOrder}
                    type="topics"
                  />
                )}
            </Box>
          )
        }
    </div>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  program: PropTypes.object.isRequired
}

export default Header
