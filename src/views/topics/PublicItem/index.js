/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Container,
  // CardMedia,
  // CardActionArea,
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
import RenderRecords from 'src/components/Section/RenderRecords'
import { Lightbox } from 'react-modal-image'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  media: {
    minHeight: 350,
    backgroundPosition: 'top'
  },
  contents: {
    '& img': {
      width: '100%',
      maxWidth: '100%',
    }
  },
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
  const [selectedImage, setSelectedImage] = useState(null)

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
        <Box
          mt={3}
          className={classes.contents}
        >

          {data.contents.map((content) => (
            <RenderRecords
              key={content._id}
              content={content}
              setSelectedImage={setSelectedImage}
            />
          ))}

        </Box>
      </Container>
      {selectedImage && (
        <Lightbox
          large={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </Page>
  )
}

TopicItem.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}
export default TopicItem
