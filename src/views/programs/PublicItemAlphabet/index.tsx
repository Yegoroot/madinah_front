/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect } from 'react'
import {
  Container,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { getProgramItemRequest } from 'src/slices/program'
import LoadingScreen from 'src/components/LoadingScreen'
import { alphabetProgramId } from 'src/constants'
import Header from '../PublicItem/Header'
import Topics from '../PublicItem/Topics'
import Alphabet from './Alphabet'

const useStyles = makeStyles((theme) => ({
  root: {
    // @ts-ignore
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  },
  topicsRoot: {
    display: 'grid',
    'grid-template-columns': 'repeat(auto-fill, minmax(270px, 1fr))',
    '& div': {
      width: '100%',
      maxWidth: '100%',
      flexBasis: '100%'
    }
  }
}))

const ProgramItem = () => {
  const programId = alphabetProgramId
  const dispatch = useDispatch()
  const { loading, data, topics } = useSelector((state: RootStateOrAny) => state.program.item)
  const classes = useStyles()

  useEffect(() => {
    dispatch(getProgramItemRequest({ programId }))
  }, [dispatch, programId])

  if (loading === 'reload') {
    return (
      <span onClick={() => dispatch(getProgramItemRequest({ programId }))}>
        Перезагрузить
      </span>
    )
  }
  if (loading || !data) {
    return <LoadingScreen />
  }

  return (
    // @ts-ignore
    <Page
      className={classes.root}
      title={data.title}
    >
      <Header
        program={data}
        topics={topics}
      />

      <Container>
        <Topics
          topics={topics}
          programId={programId}
          className={classes.topicsRoot}
        />
        <Alphabet />
      </Container>
    </Page>
  )
}

export default ProgramItem
