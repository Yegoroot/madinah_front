/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import SunEditor from 'suneditor-react'
import {
  formatBlock, list, link, fontColor, hiliteColor
} from 'suneditor/src/plugins'
import './style.css'

import CodeMirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/lib/codemirror.css'
import useSettings from 'src/hooks/useSettings'

const Editor = ({ onChange, content }) => {
  const { settings } = useSettings()
  return (
    <SunEditor
      onChange={onChange}
      setContents={content}
      setOptions={{
        codeMirror: CodeMirror,
        height: 200,
        minHeight: 200,
        formats: ['p', 'div', 'blockquote', 'h3', 'h4'],
        colorList: [['#f44336', '#3949ab', '#1c2025'], ['#4caf50', '#e6e5e8', '#8a85ff']],
        buttonList: [[fontColor, hiliteColor, 'bold', link], [list, formatBlock], ['codeView', 'undo', 'redo']
        ]
      }}
      lang={settings.lang}
    />

  )
}
export default Editor
