import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Grid, makeStyles } from '@material-ui/core'
import TopicCard from 'src/components/TopicCard'

const useStyles = makeStyles(() => ({
  root: {}
}))

const Timeline = ({ className, topics, ...rest }) => {
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
            lg={4}
            key={topic.id}
          >
            <TopicCard topic={topic} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

Timeline.propTypes = {
  className: PropTypes.string,
  topics: PropTypes.array.isRequired
}

export default Timeline
