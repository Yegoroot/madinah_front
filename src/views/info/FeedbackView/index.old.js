import React, { lazy, Suspense } from 'react'
import Page from 'src/components/Page'
import { Container, makeStyles } from '@material-ui/core'
import { MDXProvider } from '@mdx-js/react'
import components from '../mdx'

const Content = lazy(() => import('!babel-loader!mdx-loader!./Content.mdx'))

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
              <MDXProvider components={components}>
                <Content />
              </MDXProvider>
            </Container>
          </div>
        </div>

      </Suspense>
    </Page>
  )
}

export default ChangelogView
