import React, {
  useCallback,
  useState,
  useEffect
} from 'react'
import {
  Box,
  Container,
  Card,
  CardContent,
  makeStyles
} from '@material-ui/core'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import Page from 'src/components/Page'
import { API_BASE_URL } from 'src/constants'
import { instanceAxios } from 'src/utils/axios'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
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
      title="Note Details"
    >
      <Container maxWidth="lg">
        <Header note={note} />
        <Box mt={3}>
          <Card>
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Page>
  )
}

export default NoteDetailsView
