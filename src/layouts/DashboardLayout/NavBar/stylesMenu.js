import { makeStyles } from '@material-ui/core'

const useStylesMenu = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256
  },
  subheader: {
    '& svg': { flex: 'none' }
  },
  subheaderRoot: {
    // lineHeight: 1.5,
    // fontSize: 20,
    color: theme.palette.text.primary
  },
  progress: {
    top: 115,
    left: '50%',
    height: 10,
    position: 'absolute',
    transform: 'translateX(-50%)',
    justifyContent: 'center',
    width: '100%'
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}))

export default useStylesMenu
