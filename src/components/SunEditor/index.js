/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { memo } from 'react'
import SunEditor from 'suneditor-react'
import './style.css'

import CodeMirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/lib/codemirror.css'
import useSettings from 'src/hooks/useSettings'
import { plugin_mark } from './plugins/Mark'
// import { plugin_mark_Q } from './plugins/MarkQ'
import { plugin_ar_word } from './plugins/ArWord'
import { plugin_color_mark } from './plugins/Mark2'
import { plugin_ayah } from './plugins/Ayah'
import { plugin_sollya } from './plugins/Sollya'
import { plugin_surah_l, plugin_surah_r } from './plugins/Surah'
import { plugin_bism } from './plugins/BasmAllah'

const Editor = ({
  onChange, content, mini, height
}) => {
  const { settings } = useSettings()

  const max = !mini ? ['list', 'formatBlock', 'image'] : []
  const undo = !mini ? ['undo', 'redo'] : []
  return (
    <SunEditor
      onChange={onChange}
      setContents={content}
      setOptions={{
        codeMirror: CodeMirror,
        height: height || 200,
        attributesWhitelist: {
          all: 'style',
          mark: 'class', //
          input: 'checked',
        },
        minHeight: height || 200,
        addTagsWhitelist: 'mark',
        formats: ['p', 'div', 'blockquote', 'h3', 'h4'],
        plugins: [plugin_mark, plugin_color_mark, plugin_ar_word, plugin_bism, plugin_surah_l, plugin_surah_r, plugin_ayah, plugin_sollya],
        buttonList: [
          ['customCommand_mark', 'colorText'],
          ['ar_word', 'customCommand_bism', 'customCommand_surah_l', 'customCommand_surah_r', 'customCommand_ayah', 'customCommand_sollya'],
          ['strike', 'bold', 'link'],
          max, ['removeFormat', 'codeView'], undo
        ]
      }}
      lang={settings.lang}
    />

  )
}
export default memo(Editor)
