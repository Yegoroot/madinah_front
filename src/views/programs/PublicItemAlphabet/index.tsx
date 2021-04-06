/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect } from 'react'
import {
  Container,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { getProgramItemRequest } from 'src/slices/program'
import { alphabetProgramId } from 'src/constants'
import ReloadData from 'src/components/ReloadData'
import { useTranslation } from 'react-i18next'
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
    gridGap: 10,
    'grid-template-columns': 'repeat(auto-fill, minmax(110px, 1fr))',
    '& div': {
      width: '100%',
      maxWidth: '100%',
      flexBasis: '100%'
    },
    '& .forAlphabet': {
      display: 'none'
    },
    '& a': {
      fontSize: 47,
      fontWeight: 'bold'
    },
    '& > div > div > div': {
      textAlign: 'center'
    }
  }
}))

const ProgramItem = () => {
  const { t } = useTranslation()
  const programId = alphabetProgramId
  const dispatch = useDispatch()
  const { loading, data, topics } = useSelector((state: RootStateOrAny) => state.program.item)
  const classes = useStyles()

  useEffect(() => {
    dispatch(getProgramItemRequest({ programId }))
  }, [dispatch, programId])

  if (loading || !data) {
    return (
      <ReloadData
        loading={loading}
        data={data}
        onClick={() => dispatch(getProgramItemRequest({ programId }))}
      />
    )
  }

  return (
    // @ts-ignore
    <Page
      className={classes.root}
      title={data.title}
    >
      <Header
        alternativeBackground="linear-gradient(220deg, rgb(171, 57, 57), rgb(184 34 221 / 23%), transparent)"
        program={{ ...data, title: `💡 ${t('alph.alphabet')}` }}
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
