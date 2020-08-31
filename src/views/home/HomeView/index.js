import React from 'react'
import { makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import { APP_NAME } from 'src/constants'
import Hero from './Hero'
// import Features from './Features'
// import Testimonials from './Testimonials'
// import FAQS from './FAQS'
import CTA from './CTA'

const useStyles = makeStyles(() => ({
  root: {}
}))

const HomeView = () => {
  const classes = useStyles()

  return (
    <Page
      className={classes.root}
      title={`Home - ${APP_NAME}`}
    >
      <Hero />
      {/* <Features /> */}
      {/* <Testimonials /> */}
      <CTA />
      {/* <FAQS /> */}
    </Page>
  )
}

export default HomeView
