import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Box,
  Card,
  Chip,
  Divider,
  // Checkbox,
  // FormControlLabel,
  // Input,
  makeStyles
} from '@material-ui/core'
import { LANGUAGES, LEVELS } from 'src/constants'
import { useTranslation } from 'react-i18next'
import MultiSelect from './MultiSelect'

const options = {
  level: LEVELS,
  language: LANGUAGES
}

const useStyles = makeStyles((theme) => ({
  root: {},
  chip: {
    margin: theme.spacing(1)
  },
  language: {
    color: theme.palette.rainbow.level4,
  },
  level: {
    color: theme.palette.rainbow.level0,
  }
}))

const getChipsFromObj = (filter) => {
  const chips = []
  Object
    .keys(filter)
    .map((label) => filter[label].map((value) => chips.push({ value, label })))
  return chips
}

function Filter({
  className, filter, onChange, onDelete, ...rest
}) {
  const classes = useStyles()
  const { t } = useTranslation()

  const chips = getChipsFromObj(filter)

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >

      { !!chips.length && (
      <>
        <Box
          p={2}
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          { chips.map((chip) => (
            <Chip
              key={chip.value}
              className={clsx(classes.chip, classes[chip.label])}
              label={t(`chips.${chip.value}`)}
              onDelete={() => onDelete(chip)}
            />
          )) }
        </Box>
        <Divider />
      </>
      )}

      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        p={1}
      >
        {Object.keys(options).map((key) => (
          <MultiSelect
            key={key}
            label={key}
            chips={chips}
            onChange={onChange}
            options={options[key]}
            filter={filter}
          />
        ))}
      </Box>
    </Card>
  )
}

Filter.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  filter: PropTypes.object,
}

export default Filter
