/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import SunEditor from 'suneditor-react'
import {
  font, formatBlock, fontSize, link, fontColor, hiliteColor
} from 'suneditor/src/plugins'
import PluginArWord from './plugins/ArWord/ArWord'
import PluginArSentence from './plugins/ArSentence/ArSentence'
import './style.css'

import CodeMirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/lib/codemirror.css'

const Editor = ({ onChange, content }) => (
  <SunEditor
    onChange={onChange}
    setContents={content}
    setOptions={{
      codeMirror: CodeMirror, // window.CodeMirror,
      height: 200,
      minHeight: 200,
      formats: ['p', 'div', 'blockquote', 'h3', 'h4', 'h5', 'h6'],
      font: ['Droid Arabic Naskh'],
      colorList: [['#f44336', '#3949ab', '#1c2025'], ['#4caf50', '#e6e5e8', '#8a85ff']],
      fontSize: [14, 21, 27],
      plugins: [PluginArWord, PluginArSentence],
      buttonList: [
        ['ar_word', 'ar_sentence'], [fontColor, hiliteColor, 'bold', link], [font, fontSize, formatBlock], ['fullScreen', 'showBlocks', 'codeView', 'undo', 'redo']
      ]
    }}
    lang="ru"
  />

)
export default Editor
