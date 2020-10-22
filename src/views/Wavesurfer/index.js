import React, { Suspense } from 'react'
import Page from 'src/components/Page'
import { Container, makeStyles } from '@material-ui/core'
import soundfile from './Components/nasheed.mp3'
import WaveSurfer from './WaveSurfer'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    paddingTop: 64,
  },
  content: {
    paddingBottom: 120
  }
}))

const ChangelogView = () => {
  const classes = useStyles()

  // const url = 'https://cf-hls-media.sndcdn.com/media/318901/478561/u30A6AUXmB2d.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLyovKi91MzBBNkFVWG1CMmQuMTI4Lm1wMyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYwMzEzMTkxMH19fV19&Signature=Z8Tsc7a9M2M0TaZgyAGXn-lR3W6pj6xILGW4CKebOgTqy8m3Rlxa6R44ynEDbx8GR1IOUd-OuOelUAygeZflNEQHJ2zHoYKMzutugKtHNy1mz3IFTn2p3r83cT96gn16u-MdA~fWIgfjjuko0xPc87RUz-ekVevl12ofejhHfwc3zUF-52mXvdyc1TDH1TBOsQ6No74S3lPDP~87sGJ15bP7N6MUjCFzq7rKyx6bk2u0WJKmnFz-qkB8kl6nBWNmjGNFXhZQIGoFJg6s5gmyPoG3WC6AgC8AkG4hBoOSlCMT6bVqB~wTXFv5dC2plK75-Z3cBeHkxbr2wlhEDKEvKw__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ'
  const dataAnnotations = [
    {
      start: 37.81938044350356, end: 39.8196836718353, attributes: {}, data: {}
    },
    {
      start: 6.1830663350053205, end: 7.693298303435221, attributes: {}, data: { original: 'asdasd', translate: 'qweqwe qwe' }
    }
  ]
  const onSaveChangesOut = (list) => {
    console.log(list)
  }

  return (
    <Page title="Changelog">
      <Suspense fallback={null}>
        <div className={classes.wrapper}>

          <Container
            maxWidth="md"
            className={classes.content}
          >
            <WaveSurfer
              mediaLink={soundfile}
              dataAnnotations={dataAnnotations}
              onSaveChangesOut={onSaveChangesOut}
            />
          </Container>

        </div>

      </Suspense>
    </Page>
  )
}

export default ChangelogView
