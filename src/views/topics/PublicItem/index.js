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

          {data.contents.map((content) => (
            // FIXME тут только выводит пока ткустовый вариант
            <div
              key={content.id}
              dangerouslySetInnerHTML={{ __html: content.data }}
            />
          ))}

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
