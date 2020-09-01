import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Grid, makeStyles } from '@material-ui/core'
import NoteCard from 'src/components/public/NoteCard'

const useStyles = makeStyles(() => ({
  root: {}
}))

const Notes = ({
  className, notes, topic, programId, ...rest
}) => {
  const classes = useStyles()

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        container
        spacing={3}
      >

        {notes.map((note) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={topic.id}
          >
            <NoteCard
              note={note}
              topic={topic}
              programId={topic.program.id}
            />

          </Grid>
        ))}
      </Grid>
    </div>
  )
}

Notes.propTypes = {
  className: PropTypes.string,
  notes: PropTypes.array.isRequired,
  topic: PropTypes.object.isRequired,
  programId: PropTypes.string.isRequired
}

export default Notes
