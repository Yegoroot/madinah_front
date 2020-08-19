// function loadSuggestions(text) {
//   return new Promise((accept, reject) => {
//     setTimeout(() => {
//       const suggestions = [
//         {
//           preview: "Andre",
//           value: "@andre"
//         },
//         {
//           preview: "Angela",
//           value: "@angela"
//         },
//         {
//           preview: "David",
//           value: "@david"
//         },
//         {
//           preview: "Louise",
//           value: "@louise"
//         }
//       ].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()));
//       accept(suggestions);
//     }, 250);
//   });
// }
import * as React from 'react'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde.css'
import 'react-mde/lib/styles/css/react-mde-editor.css'
import 'react-mde/lib/styles/css/react-mde-toolbar.css'
import './style.css'
import Markdown from 'src/components/Markdown'

export default function MdeEditor({ onChange, value = '', }) {
  const [selectedTab, setSelectedTab] = React.useState('write')

  return (
    <ReactMde
      value={value}
      onChange={onChange}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={(source) => Promise.resolve(<Markdown
        escapeHtml={false}
        source={source}
      />)}
        // loadSuggestions={loadSuggestions}
      childProps={{
        writeButton: {
          tabIndex: -1
        }
      }}
    />

  )
}
