import React, { /* lazy, */ Suspense } from 'react'
import Page from 'src/components/Page'
import { Container, makeStyles } from '@material-ui/core'
// import { MDXProvider } from '@mdx-js/react'
// import components from '../mdx'

// const Content = lazy(() => import('!babel-loader!mdx-loader!./Content.mdx'))

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
            <Container
              maxWidth="md"
              className={classes.content}
            >

              ## V0.3.1

              ###### Nov 12, 2020

              - A lot of titles was translated
              - added filter of program
              - level
              - language

              ## V0.3.0

              ###### Oct 27, 2020

              - Added sorting of topics
              - Added sorting of record in topics
              - Fix image change
              - Load Audio with annotation

              ---

              ## V0.2.1

              ###### Sep 25, 2020

              - Service Worker update

              ---

              ## V0.2.0

              ###### Sep 19, 2020

              - Load images

              ---

              ## V0.1.0

              ###### Sep 10, 2020

              - Added types of program
              - Create and remove program folder

              ## V0.0.1

              - logic of translate
              - two editors
              - plugins for editors
              -- arWord
              -- arSentence

              {/* <MDXProvider components={components}>
                <Content />
              </MDXProvider> */}
            </Container>
          </div>
        </div>

      </Suspense>
    </Page>
  )
}

export default ChangelogView
