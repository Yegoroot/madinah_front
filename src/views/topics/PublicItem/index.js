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
import { getTopicItemRequest, MODULE } from 'src/slices/topic'
import LoadingScreen from 'src/components/LoadingScreen'
import Page from 'src/components/Page'
import RecordList from 'src/components/Record/List'
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

const ReloadButton = (onClick) => (
  <Card onClick={onClick}>
    <CardContent>Перезагрузить</CardContent>
  </Card>
)

function TopicItem({ match }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => state[MODULE].item)
  const { topicId, programId } = match.params
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    dispatch(getTopicItemRequest({ topicId, programId }))
  }, [dispatch, topicId, programId])

  if (loading === 'reload') {
    return (
      <ReloadButton onClick={() => dispatch(getTopicItemRequest({
        topicId, programId, reload: true
      }))}
      />
    )
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (!data) {
    return (
      <ReloadButton onClick={() => dispatch(getTopicItemRequest({
        topicId, programId, reload: true
      }))}
      />
    )
  }

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
          mb={12}
          className={classes.contents}
        >
          {/* ВЫВОД КОНТЕНТА */}
          <RecordList
            programId={programId}
            topicId={topicId}
            contents={data.contents}
            setSelectedImage={setSelectedImage}
            onSave={() => console.log('sdf save')}
            onDelete={() => console.log('sdfsdfsdfds delete')}
            onEdit={() => console.log('sdfsdf edit')}
            isEditPage={false}
          />

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
  match: PropTypes.object.isRequired,
}
export default TopicItem
