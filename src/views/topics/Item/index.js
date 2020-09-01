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
// import { hexToRgb } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Page from 'src/components/Page'
// import { IMAGES_BASE_URL } from 'src/constants'
import { useSelector, useDispatch } from 'src/store'
import LoadingScreen from 'src/components/LoadingScreen'
import { getTopicItemRequest, module } from 'src/slices/topic'
import Header from './Header'
import Notes from './Notes'

const useStyles = makeStyles((theme) =>
  // const hex1 = hexToRgb(`${theme.palette.background.dark}c9`) // d4
  // const hex2 = hexToRgb(`${theme.palette.background.dark}8c`) // 63
  ({
    root: {
      color: theme.palette.text.primary,
      minHeight: '100%',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    // back: {
    // paddingTop: theme.spacing(3),
    // paddingBottom: theme.spacing(3),
    //   minHeight: '100vh',
    //   background: `linear-gradient(0deg, ${theme.palette.background.dark}, ${hex1} 50%,  ${hex2} 75%)`
    // },
  }))

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

  return (
    <Page
      className={classes.root}
      title={data.title}
      // style={{ backgroundImage: data.photo ? `url(${image})` : 'none' }}
    >
      <Container
        // className={classes.back}
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

              {/* <Box dangerouslySetInnerHTML={{ __html: data.content }} /> */}

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
