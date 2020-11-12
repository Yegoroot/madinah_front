import React, {
  useState,
  useRef
} from 'react'
import {
  // Badge,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Popover,
  SvgIcon,
  Switch,
  TextField,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core'
import { Settings as SettingsIcon } from 'react-feather'
import useSettings from 'src/hooks/useSettings'
import { THEMES, LANGUAGES } from 'src/constants'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5
  },
  popover: {
    width: 320,
    padding: theme.spacing(2)
  }
}))

const Settings = () => {
  const classes = useStyles()
  const ref = useRef(null)
  const { settings, saveSettings } = useSettings()
  const [isOpen, setOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const [values, setValues] = useState({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme,
    lang: settings.lang
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (field, value) => {
    const newValues = {
      ...values,
      [field]: value
    }
    if (field === 'lang') {
      newValues.direction = value === 'ar'
        ? 'rtl'
        : 'ltr'
    }
    setValues(newValues)
  }

  const handleSave = () => {
    i18n.changeLanguage(values.lang)
    saveSettings(values)
    setOpen(false)
  }

  return (
    <>
      <Tooltip title={t('components.settings.title')}>
        {/* <Badge
          color="secondary"
          variant="dot"
          classes={{ badge: classes.badge }}
        > */}
        <IconButton
          color="inherit"
          onClick={handleOpen}
          ref={ref}
        >
          <SvgIcon fontSize="small">
            <SettingsIcon />
          </SvgIcon>
        </IconButton>
        {/* </Badge> */}
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Typography
          variant="h4"
          color="textPrimary"
        >
          {t('components.settings.title')}
        </Typography>
        <Box
          mt={2}
          px={1}
        >
          <FormControlLabel
            control={(
              <Switch
                checked={values.direction === 'rtl'}
                edge="start"
                name="direction"
                disabled={values.lang === 'ar'}
                onChange={(event) => handleChange('direction', event.target.checked ? 'rtl' : 'ltr')}
              />
            )}
            label="RTL"
          />
        </Box>
        <Box
          mt={2}
          px={1}
        >
          <FormControlLabel
            control={(
              <Switch
                checked={values.responsiveFontSizes}
                edge="start"
                name="direction"
                onChange={(event) => handleChange('responsiveFontSizes', event.target.checked)}
              />
            )}
            label={t('components.settings.font')}
          />
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            label="Language"
            name="lang"
            onChange={(event) => handleChange('lang', event.target.value)}
            select
            SelectProps={{ native: true }}
            value={values.lang}
            variant="outlined"
          >
            {LANGUAGES.map((lang) => (
              <option
                key={lang}
                value={lang}
              >
                { t(`chips.${lang}`) }
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            label={t('components.settings.theme.title')}
            name="theme"
            onChange={(event) => handleChange('theme', event.target.value)}
            select
            SelectProps={{ native: true }}
            value={values.theme}
            variant="outlined"
          >
            {Object.keys(THEMES).map((theme) => (
              <option
                key={theme}
                value={theme}
              >
                {t(`components.settings.theme.${theme}`)}
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleSave}
          >
            {t('components.settings.save_settings')}
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default Settings
