/* eslint-disable react/prop-types *//* eslint-disable camelcase */
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/ar'
import 'moment/locale/ru'
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
import { useTranslation } from 'react-i18next'
import useSettings from 'src/hooks/useSettings'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative'
  },
  edit: {
    marginTop: -8
  },
  likedButton: {
    color: colors.red[600]
  },
  subscribersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1)
  },
  unpublish: {
    position: 'absolute',
    top: -15,
    left: 0,
    color: '#f44336',
  },
}))

function TopicCard({ topic, programId }: {topic: any, programId: string }) {
  const { settings } = useSettings()
  const classes = useStyles()
  const { user } = useAuth()
  // @ts-ignore
  const role = user?.role || null
  const { t } = useTranslation()
  moment.locale(settings.lang)

  return (
    <div>

      <Box
        className={classes.root}
        mb={4}
      >
        <Link
          color="textPrimary"
          component={RouterLink}
          to={`${PUBLIC_PROGRAMS_URL}/${programId}/topics/${topic.id}`}
          variant="h2"
        >
          {topic.title}
        </Link>
        { !user || !document_is_my_own(user, topic.user) || !perm_work_with_program(role) ? null
          : (
            <>
              {!topic.publish && <div className={classes.unpublish}>Unpublish</div> }

              <IconButton
                className={classes.edit}
                component={RouterLink}
                to={`${TOPICS_URL}/${topic.id}/edit`}
              >
                <SvgIcon
                  fontSize="small"
                  color="inherit"
                >
                  <EditIcon />
                </SvgIcon>
              </IconButton>
            </>
          )}
        <Box>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {topic.description}
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          mt={1}
        >
          <Box>
            {/* <Typography
              variant="body2"
              color="textSecondary"
            >
              <b>
                {t('time.created')}
              </b>
              {' '}
              {moment(topic.createdAt).fromNow()}
            </Typography> */}
            <Typography
              variant="body2"
              color="textSecondary"
            >
              <b>
                {t('time.updated')}
              </b>
              {' '}
              {moment(topic.updatedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>

    </div>
  )
}

TopicCard.propTypes = {
  topic: PropTypes.object.isRequired,
  programId: PropTypes.string.isRequired
}

export default TopicCard
