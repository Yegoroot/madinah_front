import React, { useEffect } from 'react'
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

function TopicDetailsView({ match }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => state[module].item)
  const { topicId, programId } = match.params

  useEffect(() => {
    dispatch(getTopicItemRequest({ topicId, programId }))
  }, [dispatch, topicId, programId])

  if (loading === 'reload') {
    return (
      <Card
        onClick={() => dispatch(getTopicItemRequest({ topicId, programId, reload: true }))}
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

export default TopicDetailsView
