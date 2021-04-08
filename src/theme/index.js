import _ from 'lodash'
import {
  colors,
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core'
import { THEMES } from 'src/constants'
import { softShadows, strongShadows } from './shadows'
import typography from './typography'

const baseOptions = {
  direction: 'ltr',
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden'
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32
      }
    },
    MuiListSubheader: {
      root: {
        lineHeight: '1.6',
        paddingTop: 13,
        paddingBottom: 13
      }
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)'
      }
    }
  }
}

const themesOptions = [
  {
    name: THEMES.LIGHT,
    overrides: {
      MuiInputBase: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: colors.blueGrey[600]
          }
        }
      }
    },
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600]
      },
      background: {
        default: '#ffffff',
        dark: '#f4f6f8',
        paper: colors.common.white
      },
      primary: {
        main: '#3949ab'
      },
      error: {
        main: '#f44336'
      },
      secondary: {
        main: '#5850EC'
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600]
      },
      rainbow: {
        level0: colors.indigo[400],
        level1: colors.lightBlue[500],
        level2: colors.cyan[500],
        level3: colors.teal[500],
        level4: colors.green[500],
        level5: colors.lightGreen[500],
      },
    },
    shadows: softShadows
  },
  {
    name: THEMES.ONE_DARK,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34'
      },
      primary: {
        main: '#289dca'
      },
      error: {
        main: '#f44336'
      },
      secondary: {
        main: '#8a85ff'
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb'
      },
      rainbow: {
        level0: colors.blue[400],
        level1: colors.lightBlue[400],
        level2: colors.cyan[400],
        level3: colors.teal[400],
        level4: colors.green[400],
        level5: colors.lightGreen[400],
      },
    },
    shadows: strongShadows
  },
  // {
  //   name: THEMES.UNICORN,
  //   palette: {
  //     type: 'dark',
  //     action: {
  //       active: 'rgba(255, 255, 255, 0.54)',
  //       hover: 'rgba(255, 255, 255, 0.04)',
  //       selected: 'rgba(255, 255, 255, 0.08)',
  //       disabled: 'rgba(255, 255, 255, 0.26)',
  //       disabledBackground: 'rgba(255, 255, 255, 0.12)',
  //       focus: 'rgba(255, 255, 255, 0.12)'
  //     },
  //     background: {
  //       default: '#2a2d3d',
  //       dark: '#222431',
  //       paper: '#2a2d3d'
  //     },
  //     primary: {
  //       main: '#a67dff'
  //     },
  //     secondary: {
  //       main: '#a67dff'
  //     },
  //     text: {
  //       primary: '#f6f5f8',
  //       secondary: '#9699a4'
  //     }
  //   },
  //   shadows: strongShadows
  // }
]

// eslint-disable-next-line import/prefer-default-export
export const createTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme)

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions
  }

  let theme = createMuiTheme(
    _.merge(
      {},
      baseOptions,
      themeOptions,
      { direction: config.direction }
    )
  )

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return theme
}
