import React, {
  useEffect,
  useState
} from 'react'
import {
  Box,
  Container,
  // Typography,
  makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import { useSelector, useDispatch } from 'react-redux'
import { getProgramListRequest, module } from 'src/slices/program'
import LoadingScreen from 'src/components/LoadingScreen'
import { useTranslation } from 'react-i18next'
import { useHistory, } from 'react-router-dom'
import Filter from './Filter'
import Results from './Results'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))

function ProgramBrowseView({ location, match }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const classes = useStyles()

  const { loading, data } = useSelector((state) => state[module].list)
  const urlParams = new URLSearchParams(location.search)

  const onDeleteParam = ({ label, value }) => {
    const values = urlParams.getAll(label)
    console.log(label, value)
    urlParams.delete(label)
    values
      .filter((v) => v !== value)
      .forEach((v) => urlParams.append(label, v))
    history.push({ search: `?${urlParams.toString()}` })
  }

  const [filter, setFilter] = useState({
    level: urlParams.getAll('level'),
    language: urlParams.getAll('language')
  })

  useEffect(() => {
    dispatch(getProgramListRequest({ params: filter }))
  }, [dispatch, filter])

  if (loading === 'reload') {
    return <span onClick={() => dispatch(getProgramListRequest({ params: filter, reload: true }))}>Перезагрузить</span>
  } if (loading || !data) {
    return <LoadingScreen />
  }

  const onChange = ({
    newFilter, label, isDeleted, value
  }) => {
    setFilter(newFilter)

    if (isDeleted) {
      onDeleteParam({ label, value })
    } else {
      urlParams.append(label, value)
      history.push({ search: `?${urlParams.toString()}`, /* state: {} */ })
    }

    // dispatch(getProgramListRequest({ params: newFilter }))
  }

  const onDelete = ({ label, value }) => {
    const newFilter = { ...filter }
    newFilter[label] = newFilter[label].filter((v) => v !== value)
    setFilter(newFilter)
    onDeleteParam({ label, value })
  }

  return (
    <Page
      className={classes.root}
      title={t('menu.programs')}
    >
      <Container maxWidth={false}>

        {/* <Typography
          variant="h1"
          color="textPrimary"
        >
          {t('programspage.choose')}
        </Typography> */}
        <Box
          mb={3}
          mt={3}
        >
          <Filter
            filter={filter}
            onChange={onChange}
            onDelete={onDelete}
          />
        </Box>
        <Box mt={2}>
          <Results programs={data} />
        </Box>
      </Container>
    </Page>
  )
}

export default ProgramBrowseView
