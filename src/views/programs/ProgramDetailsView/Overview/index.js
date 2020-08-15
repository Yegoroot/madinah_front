import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  // Box,
  Grid,
  makeStyles
} from '@material-ui/core'
import Brief from './Brief'
// import Holder from './Holder'
// import Members from './Members'

const useStyles = makeStyles(() => ({
  root: {}
}))

function Overview({ program, className, ...rest }) {
  const classes = useStyles()
  console.log(program)
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid
        item
        lg={8}
        xl={9}
        xs={12}
      >
        <Brief program={program} />
      </Grid>
      {/* <Grid
        item
        lg={4}
        xl={3}
        xs={12}
      >
        <Members members={program.members} />
         <Box mt={3}>
          <Holder program={program} />
        </Box>
      </Grid> */}
    </Grid>
  )
}

Overview.propTypes = {
  className: PropTypes.string,
  program: PropTypes.object.isRequired
}

export default Overview
