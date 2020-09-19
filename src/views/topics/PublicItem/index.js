/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Container,
  CardContent,
  Card,
  makeStyles
} from '@material-ui/core'
import { useSelector, useDispatch } from 'src/store'
import { getTopicItemRequest, module } from 'src/slices/topic'
import LoadingScreen from 'src/components/LoadingScreen'
import Page from 'src/components/Page'
import useAuth from 'src/hooks/useAuth'
import { get_item } from 'src/utils/permissions'
import MarkdownType from 'src/components/Section/Item/MarkdownType'
import TextType from 'src/components/Section/Item/TextType'
import { UPLOADS_URL } from 'src/constants'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.text.primary,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))

function TopicItem({ match, location }) {
  const { user } = useAuth()
  const classes = useStyles()
  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => state[module].item)
  const { topicId, programId } = match.params

  const type = get_item({ location, user }) ? 'private' : ''

  useEffect(() => {
    dispatch(getTopicItemRequest({ topicId, programId, type }))
  }, [dispatch, topicId, programId, type])

  const renderContents = (content) => {
    if (content.type === 'text') {
      return (
        <TextType
          key={content._id}
          content={content}
        />
      )
    }
    if (content.type === 'image') {
      return (
        <img
          key={content._id}
          src={`${UPLOADS_URL}/programs/${programId}/${content.data.image}`}
        />
      )
    }
    if (content.type === 'markdown') {
      return (
        <MarkdownType
          key={content._id}
          content={content}
        />
      )
    }
  }

  if (loading === 'reload') {
    return (
      <Card
        onClick={() => dispatch(getTopicItemRequest({
          topicId, programId, type, reload: true
        }))}
      >
        <CardContent>Перезагрузить</CardContent>
      </Card>
    )
  }

  if (loading || !data) {
    return <LoadingScreen />
  }

  console.log(data)

  return (
    <Page
      className={classes.root}
      title={data.title}
    >
      <Container maxWidth="lg">
        <Header
          topic={data}
        />
        <Box mt={3}>

          {data.contents.map((content) => renderContents(content))}

        </Box>
      </Container>
    </Page>
  )
}

TopicItem.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}
export default TopicItem
