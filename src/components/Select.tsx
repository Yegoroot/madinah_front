/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  InputLabel, FormControl, Select, FormHelperText, MenuItem
} from '@material-ui/core'

export default function CustSelect(
  {
    error, value, onChange, collection, helper, name, id, label, collectionElement
  }:
  {error: boolean, value: string, onChange: any, collection: any[],
   helper: any, name: string, id: string, label: string, collectionElement: string[] }
): any {
  return (
    <FormControl
      fullWidth
      error={error}
    >
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        name={name}
        autoFocus
        value={value}
        onChange={onChange}
      >
        {collection.map((el) => (
          <MenuItem
            key={el[collectionElement[0]]}
            value={el[collectionElement[0]]}
          >
            {el[collectionElement[1]]}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helper}</FormHelperText>
    </FormControl>
  )
}
