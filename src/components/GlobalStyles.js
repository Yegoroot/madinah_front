import { createStyles, makeStyles } from '@material-ui/core'

/**
 * GLOBAL STYLE
 *
 * для тех тегов которые отдельано от theme
 */
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
      // [theme.breakpoints.up('md')]: {
      height: '100%',
      // },
      width: '100%'
    },
    body: {
      fontSize: '1.2rem',
      fontFamily: '"Roboto", "Droid Arabic Naskh", "Helvetica", "Arial", sans-serif',
      // fontFamily: '"Roboto", "Amiri", "Helvetica", "Arial", sans-serif',
      height: '100%',
      width: '100%',
      lineHeight: 2,
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
    code: {
      background: theme.palette.background.dark,
      padding: 3,
      color: theme.palette.text.primary
    },
    pre: {
      '& code': {
        background: 'initial',
        padding: 'initial',
        color: 'initial'
      },
    },
    table: {
      borderSpacing: 0,
      // '& th': {
      //   background: theme.palette.text.primary,
      //   color: theme.palette.background.default
      // },
      '& td': {
        padding: 4,
        textAlign: 'center',
        // border: 'solid 1px #ccc'
      }
    },
    blockquote: {
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
    textarea: {
      '&:focus': {
        outline: 'none'
      }
    },
    nav: {
      marginBottom: 18
    },
    h1: {
      fontWeight: 500,
      fontSize: '3.2rem',
      letterSpacing: '-0.24px',
      lineHeight: 1.167,
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        marginTop: 15
      },
      [theme.breakpoints.up('md')]: {
        marginTop: 40
      }
    },
    h2: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
      fontSize: '2.7rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '2rem',
      }
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
    },
    b: {
      color: theme.palette.text.primary
    },
    mark: {
      background: `${theme.palette.primary.main} !important`,
      color: '#fff',
      'border-radius': 4,
      padding: '7px 0px',
      boxShadow: `3px 0 0 ${theme.palette.primary.main},
       -3px 0 0 ${theme.palette.primary.main}`,
      marginLeft: 3,
      marginRight: 3,
      '&.mark2': {
        color: `${theme.palette.secondary.main} !important`,
        padding: 0,
        background: 'none !important',
        fontWeight: 'bold',
        boxShadow: 'none'
      },
    },
  },

}))

const GlobalStyles = () => {
  useStyles()

  return null
}

export default GlobalStyles
