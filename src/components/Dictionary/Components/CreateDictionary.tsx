import React from 'react'
import { Button } from '@material-ui/core'
import { useDispatch, } from 'src/store/hooks'
import { createDictionaryRequest } from 'src/slices/dictionary'
import { useTranslation } from 'react-i18next'

export default function Create({ className }: {className: string}):any {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const onCreateDictionary = async () => {
    dispatch(createDictionaryRequest())
  }

  return (
    <div className={className}>
      <Button
        onClick={onCreateDictionary}
        variant="outlined"
      >
        {t('dict.create a dictionary')}
      </Button>
    </div>
  )
}
