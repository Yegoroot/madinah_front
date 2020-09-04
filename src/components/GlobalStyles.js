import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
    blocknote: {
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
      borderLeft: `4px solid ${theme.palette.text.secondary}`,
      '& > p': {
        color: theme.palette.text.secondary,
        marginBottom: 0
      }
    },
    h1: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(2)
    },
    h2: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(2)
    },
    h3: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(2)
    },
    h4: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2)
    },
    h5: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    h6: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    ol: {
      marginLeft: theme.spacing(4),
      marginBottom: theme.spacing(2)
    },
    ul: {
      marginLeft: theme.spacing(4),
      marginBottom: theme.spacing(2)
    },
    p: {
      marginBottom: theme.spacing(2),
      '& > a': {
        color: theme.palette.secondary.main
      }
    },
    hr: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      backgroundColor: theme.palette.primary.main,
      border: 0,
      height: 1
    }
  }

}))

const GlobalStyles = () => {
  useStyles()

  return null
}

export default GlobalStyles
