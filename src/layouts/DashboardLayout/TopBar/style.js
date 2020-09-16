import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2),
    }
  },
  toolbar: {
    minHeight: 64,
    justifyContent: 'flex-start'
  },

}))

export default useStyles
