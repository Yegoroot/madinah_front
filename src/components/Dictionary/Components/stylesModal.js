import { makeStyles, hexToRgb } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => {
  const borderLight = hexToRgb(`${theme.palette.text.primary}12`)

  return {
    dialogActions: {
      justifyContent: 'flex-start',
      color: theme.palette.error.main
    },
    dialogActionsShowCategory: {
      justifyContent: 'space-between',
      color: theme.palette.error.main,
      '& > div': {
        width: 'auto'
      }
    },
    dialogTitle: {
      fontSize: '2rem',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.5rem',
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10
      }
    },
    dialogContent: {
      [theme.breakpoints.down('xs')]: {
        padding: 10
      }
    },

    paper: {
      [theme.breakpoints.down('xs')]: {
        width: '95%',
        'min-width': '95%'
      }
    },

    closeIcon: {
      color: theme.palette.error.main,
      marginLeft: 'auto'
    },
    // word form
    wordTitleInput: {
      marginBottom: 16,
      marginTop: 8,
      '& input': {
        fontSize: 21
      }
    },
    // word show
    wordContent: {
      fontSize: '.9rem'
    },
    cardWord: {
      display: 'flex',
      marginBottom: 20,
      paddingBottom: 10,
      borderBottom: `solid 1px ${borderLight}`
    }
  }
})

export default useStyles
