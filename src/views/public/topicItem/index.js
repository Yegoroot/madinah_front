import React, {
  useEffect
} from 'react'
import {
  Box,
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid
} from '@material-ui/core'
import PropTypes from 'prop-types'
import Page from 'src/components/Page'
import { useSelector, useDispatch } from 'src/store'
import LoadingScreen from 'src/components/LoadingScreen'
import { getTopicItemRequest, module } from 'src/slices/topic'
import Header from './Header'
import Notes from './Notes'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    minHeight: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}))

function TopicDetailsView({ match }) {
  const classes = useStyles()
  const { topicId, programId } = match.params
  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => state[module].item)

  // const getNote = useCallback(() => {
  //   instanceAxios
  //     .get(`${API_BASE_URL}/notes/${noteId}`)
  //     .then((response) => {
  //       if (isMountedRef.current) {
  //         setNote(response.data.data)
  //       }
  //     })
  // }, [isMountedRef, noteId, programId])

  // useEffect(() => {
  //   getNote()
  // }, [getNote])

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

  return (
    <Page
      className={classes.root}
      title={data.title}
    >
      <Container
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

              {!data.notes.length ? null : (
                <>
                  <h2>Notes</h2>
                  <Box mt={3}>

                    <Notes
                      topic={data}
                      notes={data.notes}
                      programId={data.program.id}
                    />

                  </Box>
                </>
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
