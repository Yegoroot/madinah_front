import React, { useState } from 'react'
import {
  Editor, EditorState, RichUtils,
} from 'draft-js'
import {
  Button, Box, Paper, makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const DraftJsEditor = () => {
  const classes = useStyles()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const boldText = (e) => {
    // onMouseDown and e.preventDefault because editor losses focus if you use onClick
    e.preventDefault()
    const nextState = RichUtils.toggleInlineStyle(editorState, 'BOLD')
    setEditorState(nextState)
  }

  return (
    <Paper className={classes.root}>
      <Box p={2}>
        <Button onMouseDown={boldText}>Bold</Button>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
        />
      </Box>
    </Paper>
  )
}

export default DraftJsEditor
