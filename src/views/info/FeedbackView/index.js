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
    color: theme.palette.text.primary
  },
  contentContainer: {
    flex: '1 1 auto',
    overflow: 'auto',
    padding: '0 20px',
    paddingBottom: 40,
    '& a': {
      color: theme.palette.primary.main
    }
  }
}))

const ChangelogView = () => {
  const classes = useStyles()
  return (
    <Page title="Changelog">
      <Suspense fallback={null}>
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            Assalam Aleykum
            <br />
            We work this project and in sha Allah
            In Madinah.best will have added a lot of new features.
            <br />
            If you want to help or criticize or advise, please call or write by this number
            {' '}
            <a href="tel:+966 500 328 598">+966 500 328 598 </a>
          </div>
        </div>

      </Suspense>
    </Page>
  )
}

export default ChangelogView
