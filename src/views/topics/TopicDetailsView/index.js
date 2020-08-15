import React, {
  useCallback,
  useState,
  useEffect
} from 'react'
import { Lightbox } from 'react-modal-image'
import {
  Box,
  Container,
  Card,
  CardContent,
  makeStyles,
  CardActionArea,
  CardMedia,
  Divider, CardHeader,
  Grid
} from '@material-ui/core'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import Page from 'src/components/Page'
import { API_BASE_URL, IMAGES_BASE_URL } from 'src/constants'
import { instanceAxios } from 'src/utils/axios'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  media: {
    height: 500,
    backgroundPosition: 'top'
  }
}))

function TopicDetailsView({ match }) {
  const classes = useStyles()
  const isMountedRef = useIsMountedRef()
  const [topic, setTopic] = useState(null)
  const { topicId } = match.params
  const [openedFile, setOpenedFile] = useState(null)

  const getTopic = useCallback(() => {
    instanceAxios
      .get(`${API_BASE_URL}/topics/${topicId}`)
      .then((response) => {
        if (isMountedRef.current) {
          setTopic(response.data.data)
        }
      })
  }, [isMountedRef, topicId])

  useEffect(() => {
    getTopic()
  }, [getTopic])

  if (!topic) {
    return null
  }

  const image = `${IMAGES_BASE_URL}/${topic.photo}`
  const notes = () => topic.notes.map((note) => (
    <span key={note.id}>
      {note.title}
      -
      {note.id}
    </span>
  ))

  return (
    <Page
      className={classes.root}
      title="Topic Details"
    >

      <Container maxWidth="lg">
        <Header topic={topic} />

        <Box mt={2}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={topic.photo ? 8 : 12}
              // sm={7}
              xs={12}
            >
              <Box>
                <Card>
                  <CardHeader title="Content" />
                  <Divider />
                  <CardContent>
                    <div dangerouslySetInnerHTML={{ __html: topic.content }} />
                  </CardContent>
                </Card>
              </Box>
              {!topic.notes.length ? null : (
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
            {topic.photo && (
            <Grid
              item
              md={4}
              sm={5}
              xs={12}
            >
              <CardActionArea onClick={() => setOpenedFile(image)}>
                <CardMedia
                  className={classes.media}
                  image={image}
                />
              </CardActionArea>

            </Grid>
            )}
          </Grid>
        </Box>
        {/* <Box mt={3}>
          <Card>
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: topic.content }} />
            </CardContent>
          </Card>
        </Box> */}
      </Container>
      {openedFile && (
        <Lightbox
          large={openedFile}
          onClose={() => setOpenedFile(null)}
        />
      )}
    </Page>
  )
}

export default TopicDetailsView
