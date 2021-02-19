import React, { Suspense } from 'react'
import { makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    paddingTop: 64,
  },
  contentContainer: {
    flex: '1 1 auto',
    overflow: 'auto'
  },
  content: {
    paddingBottom: 120
  }
}))

const ChangelogView = () => {
  const classes = useStyles()
  return (
    <Page title="Changelog">
      <Suspense fallback={null}>
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            t
          </div>
        </div>

      </Suspense>
    </Page>
  )
}

export default ChangelogView
