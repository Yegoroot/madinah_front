/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useRef } from 'react'
import { InputBase, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import { renameCategory } from 'src/slices/dictionary'
import { useDispatch, } from 'src/store/hooks'

export const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    display: 'flex'
  },
  textField: {
    width: '100%',
    '& input': {
      fontSize: '2rem'
    },
  },
  icon: {
    color: theme.palette.text.primary,
    paddingLeft: 0
  }
}))

export default function TitleCategoryDict({ value, id }: {value: string, id: string}) {
  const [isEdit, setIsEdit] = useState(false)
  const [title, setTitle] = useState(value)
  const classes = useStyles()
  const textInput = useRef(null)
  const dispatch = useDispatch()

  const onSave = () => {
    dispatch(renameCategory({
      categotyId: id,
      title
    }))
    setIsEdit(false)
  }

  const onEdit = () => {
    setIsEdit(true)
    setTimeout(() => {
    // @ts-ignore
      textInput.current.focus()
    }, 100)
  }

  return (
    <div className={classes.root}>
      {isEdit
        ? (
          <IconButton
            onClick={onSave}
            className={classes.icon}
          >
            <SaveIcon />
          </IconButton>
        )
        : (
          <IconButton
            onClick={onEdit}
            className={classes.icon}
          >
            <EditIcon />
          </IconButton>
        )}
      <InputBase
        inputRef={textInput}
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
        className={classes.textField}
        disabled={!isEdit}
      />
    </div>
  )
}
