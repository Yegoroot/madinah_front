import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Grid, makeStyles } from '@material-ui/core'
import TopicCard from 'src/components/TopicCard'

const useStyles = makeStyles(() => ({
  root: {}
}))

const Topics = ({
  className, topics, programId, ...rest
}) => {
  const classes = useStyles()

  return (

    <Grid
      className={clsx(classes.root, className)}
      {...rest}
      container
      spacing={3}
    >

      {topics.map((topic) => (
        <Grid
          item
          xs={12}
          md={6}
          key={topic.id}
        >
          <TopicCard
            programId={programId}
            topic={topic}
          />
        </Grid>
      ))}
    </Grid>

  )
}

Topics.propTypes = {
  className: PropTypes.string,
  topics: PropTypes.array.isRequired,
  programId: PropTypes.string.isRequired
}

export default Topics
