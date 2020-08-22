import React, {
  useEffect
} from 'react'
import {
  Box,
  Container,
  Card,
  CardContent,
  makeStyles,
  Divider, CardHeader,
  Grid
} from '@material-ui/core'
import { hexToRgb } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Page from 'src/components/Page'
import { IMAGES_BASE_URL } from 'src/constants'
import { useSelector, useDispatch } from 'src/store'
import LoadingScreen from 'src/components/LoadingScreen'
import { getTopicItemRequest, module } from 'src/slices/topic'
import Header from './Header'

const useStyles = makeStyles((theme) => {
  const hex1 = hexToRgb(`${theme.palette.background.dark}c9`) // d4
  const hex2 = hexToRgb(`${theme.palette.background.dark}8c`) // 63
  return {
    root: {
      color: theme.palette.text.primary,
      minHeight: '100%',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    },
    back: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      minHeight: '100vh',
      background: `linear-gradient(0deg, ${theme.palette.background.dark}, ${hex1} 50%,  ${hex2} 75%)`
    },
  }
})

function TopicDetailsView({ match }) {
  const classes = useStyles()
  const { topicId } = match.params
  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => state[module].item)

  useEffect(() => {
    dispatch(getTopicItemRequest({ id: topicId }))
  }, [dispatch, topicId])

  if (loading === 'reload') {
    return (
      <Card
        onClick={() => dispatch(getTopicItemRequest({ topicId, reload: true }))}
      >
        <CardContent>Перезагрузить</CardContent>
      </Card>
    )
  }

  if (loading || !data) {
    return <LoadingScreen />
  }

  const image = `${IMAGES_BASE_URL}/${data.photo}`
  const notes = () => data.notes.map((note) => (
    <span key={note.id}>
      {note.title}
      -
      {note.id}
    </span>
  ))

  return (
    <Page
      className={classes.root}
      title={data.title}
      style={{ backgroundImage: data.photo ? `url(${image})` : 'none' }}
    >
      <Container
        className={classes.back}
        maxWidth="lg"
      >
        <Header topic={data} />

        <Box mt={2}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >

              <Box dangerouslySetInnerHTML={{ __html: data.content }} />

              {!data.notes.length ? null : (
                <Box mt={3}>
                  <Card>
                    <CardHeader title="Notes" />
                    <Divider />
                    <CardContent>
                      {notes()}
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  )
}

TopicDetailsView.propTypes = {
  match: PropTypes.object.isRequired,
}

export default TopicDetailsView
