/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles((theme) => ({
  root: {},
  menuItem: {
    padding: 0
  },
  formControlLabel: {
    padding: theme.spacing(0.5, 2),
    width: '100%',
    margin: 0
  }
}))

function MultiSelect({
  label,
  options,
  chips,
  filter,
  onChange
}) {
  const { t } = useTranslation()
  const classes = useStyles()
  const anchorRef = useRef(null)
  const [openMenu, setOpenMenu] = useState(false)
  const handleMenuOpen = () => {
    setOpenMenu(true)
  }

  const handleMenuClose = () => {
    setOpenMenu(false)
  }

  const handleOptionToggle = (event, lAbel) => {
    let newValue = [...filter[lAbel]]
    const { value } = event.target
    let isDeleted = false

    if (event.target.checked) {
      newValue.push(value)
    } else {
      isDeleted = true
      newValue = newValue.filter((item) => item !== value)
    }

    const newFilter = { ...filter, [lAbel]: newValue }

    if (onChange) {
      onChange({
        newFilter, value, isDeleted, label: lAbel
      })
    }
  }

  return (
    <>
      <Button
        onClick={handleMenuOpen}
        ref={anchorRef}
      >
        {t(`filter.${label}`)}
        <ArrowDropDownIcon />
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        className={classes.menu}
        elevation={1}
        onClose={handleMenuClose}
        open={openMenu}
        PaperProps={{ style: { width: 250 } }}
      >
        {options.map((option) => (
          <MenuItem
            className={classes.menuItem}
            key={option}
          >
            <FormControlLabel
              className={classes.formControlLabel}
              control={(
                <Checkbox
                  checked={chips.findIndex((el) => el.value === option) > -1}
                  onClick={(e) => handleOptionToggle(e, label)}
                  value={option}
                />
              )}
              label={t(`chips.${option}`)}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  chips: PropTypes.array.isRequired
}

export default MultiSelect
