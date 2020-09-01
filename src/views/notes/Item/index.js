import React, {
  useCallback,
  useState,
  useEffect
} from 'react'
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import Page from 'src/components/Page'
import { API_BASE_URL } from 'src/constants'
import { instanceAxios } from 'src/utils/axios'
import Header from './Header.js'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.text.primary,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))

function NoteDetailsView({ match }) {
  const classes = useStyles()
  const isMountedRef = useIsMountedRef()
  const [note, setNote] = useState(null)
  const { noteId } = match.params

  const getNote = useCallback(() => {
    instanceAxios
      .get(`${API_BASE_URL}/notes/${noteId}`)
      .then((response) => {
        if (isMountedRef.current) {
          setNote(response.data.data)
        }
      })
  }, [isMountedRef, noteId])

  useEffect(() => {
    getNote()
  }, [getNote])

  if (!note) {
    return null
  }

  return (
    <Page
      className={classes.root}
      title={note.title}
    >
      <Container maxWidth="lg">
        <Header
          note={note}
          match={match}
        />
        <Box mt={3}>

          {note.contents.map((content) => (
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

export default NoteDetailsView
