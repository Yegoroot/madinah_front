import React, { Suspense } from 'react'
import { makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import Markdown from 'src/components/Markdown'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    paddingTop: 64,
    color: theme.palette.text.primary
  },
  contentContainer: {
    flex: '1 1 auto',
    overflow: 'auto',
    padding: '0 20px'
  },
}))

const source = `
## v0.10.0

###### March 28, 2021

### For User

- Interactive Alphabet
- image view width improvment

---

## v0.9.0

###### March 27, 2021

### For Admins

- image edit text fix bug
- image full and iinitial width
- fix bug audio edit position fixed (fixed it)

### For User

- Program view small style improvment

---

## v0.8.0

###### March 26, 2021

### For Users

- Fixed Audio Player position into bottom when user click "play"
- Fix some bugs in audio record

---

## v0.7.0

###### March 25, 2021

### For Admins, Teachers

- Audio Record with text Editor
  > You can add audio with your html
- Image in TextEditor
  > You can change image and text while audio is playing

### For Users

- Hightlight style improvment
- Improvment Audio Text

### For Developers

- Refactored Menu's Layout
- Refactored AudioType

---

## v0.6.0

###### March 14, 2021

- added tag "mark" for TextEditor (hightlight)
- added special arabic symbols in TextEditor

---

## v0.5.0

###### March 11, 2021

- added auth Github
- added date of update for Topic material

---

## v0.4.0

###### March 5, 2021

- added auth Google
- update libraries
- added support Typescript for front codebase

---

## V0.3.1

###### Nov 12, 2020

- A lot of titles was translated
- added filter of program

  - level
  - language

---

## V0.3.0

###### Oct 27, 2020

- Added sorting of topics
- Added sorting of record in topics
- Fix image change
- Load Audio with annotation

---

## V0.2.1

###### Sep 25, 2020

- Service Worker update

---

## V0.2.0

###### Sep 19, 2020

- Load images

---

## V0.1.0

###### Sep 10, 2020

- Added types of program
- Create and remove program folder

---

## V0.0.1

- logic of translate
- two editors
- plugins for editors
  -- arWord
  -- arSentence

`

const ChangelogView = () => {
  const classes = useStyles()
  return (
    <Page title="Changelog">
      <Suspense fallback={null}>
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <h1>Changelog</h1>
            <Markdown
              escapeHtml={false}
              source={source}
            />
          </div>
        </div>

      </Suspense>
    </Page>
  )
}

export default ChangelogView
