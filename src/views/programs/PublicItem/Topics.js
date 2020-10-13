import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Grid, makeStyles } from '@material-ui/core'
import TopicCard from 'src/components/TopicCard'

const useStyles = makeStyles(() => ({
  root: {},
  topic: {
    marginBottom: 30
  }
}))

const Topics = ({
  className, topics, programId, ...rest
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

        {topics.map((topic) => (
          <Grid
            item
            xs={12}
            md={6}
            // lg={6}
            className={classes.topic}
            key={topic.id}
          >
            <TopicCard
              programId={programId}
              topic={topic}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

Topics.propTypes = {
  className: PropTypes.string,
  topics: PropTypes.array.isRequired,
  programId: PropTypes.string.isRequired
}

export default Topics
