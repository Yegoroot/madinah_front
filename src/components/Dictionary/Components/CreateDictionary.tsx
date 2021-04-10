import React from 'react'
import { Button } from '@material-ui/core'
import { useDispatch, } from 'src/store/hooks'
import { createDictionaryRequest } from 'src/slices/dictionary'

export default function Create({ className }: {className: string}):any {
  const dispatch = useDispatch()

  const onCreateDictionary = async () => {
    dispatch(createDictionaryRequest())
  }

  return (
    <div className={className}>
      <Button
        onClick={onCreateDictionary}
        variant="outlined"
      >
        {/* {t('menu.programs')} */}
        Create Dictionary
      </Button>
    </div>
  )
}
