/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useSound from 'use-sound'
import { makeStyles, Button } from '@material-ui/core'
// @ts-ignore
import a1_1 from './mp3/ا.mp3' // @ts-ignore
import a1_2 from './mp3/ا_2.mp3' // @ts-ignore
import a2_1 from './mp3/ب.mp3' // @ts-ignore
import a2_2 from './mp3/ب_2.mp3' // @ts-ignore
import a3_1 from './mp3/ت.mp3' // @ts-ignore
import a3_2 from './mp3/ت_2.mp3' // @ts-ignore
import a4_1 from './mp3/ث.mp3' // @ts-ignore
import a4_2 from './mp3/ث_2.mp3' // @ts-ignore
import a5_1 from './mp3/ج.mp3' // @ts-ignore
import a5_2 from './mp3/ج_2.mp3' // @ts-ignore
import a6_1 from './mp3/ح.mp3' // @ts-ignore
import a6_2 from './mp3/ح_2.mp3' // @ts-ignore
import a7_1 from './mp3/خ.mp3' // @ts-ignore
import a7_2 from './mp3/خ_2.mp3' // @ts-ignore
import a8_1 from './mp3/د.mp3' // @ts-ignore
import a8_2 from './mp3/د_2.mp3' // @ts-ignore
import a9_1 from './mp3/ذ.mp3' // @ts-ignore
import a9_2 from './mp3/ذ_2.mp3' // @ts-ignore
import a10_1 from './mp3/ر.mp3' // @ts-ignore
import a10_2 from './mp3/ر_2.mp3' // @ts-ignore
import a11_1 from './mp3/ز.mp3' // @ts-ignore
import a11_2 from './mp3/ز_2.mp3' // @ts-ignore
import a12_1 from './mp3/س.mp3' // @ts-ignore
import a12_2 from './mp3/س_2.mp3' // @ts-ignore
import a13_1 from './mp3/ش.mp3' // @ts-ignore
import a13_2 from './mp3/ش_2.mp3' // @ts-ignore
import a14_1 from './mp3/ص.mp3' // @ts-ignore
import a14_2 from './mp3/ص_2.mp3' // @ts-ignore
import a15_1 from './mp3/ض.mp3' // @ts-ignore
import a15_2 from './mp3/ض_2.mp3' // @ts-ignore
import a16_1 from './mp3/ط.mp3' // @ts-ignore
import a16_2 from './mp3/ط_2.mp3' // @ts-ignore
import a17_1 from './mp3/ظ.mp3' // @ts-ignore
import a17_2 from './mp3/ظ_2.mp3' // @ts-ignore
import a18_1 from './mp3/ع.mp3' // @ts-ignore
import a18_2 from './mp3/ع_2.mp3' // @ts-ignore
import a19_1 from './mp3/غ.mp3' // @ts-ignore
import a19_2 from './mp3/غ_2.mp3' // @ts-ignore
import a20_1 from './mp3/ف.mp3' // @ts-ignore
import a20_2 from './mp3/ف_2.mp3' // @ts-ignore
import a21_1 from './mp3/ق.mp3' // @ts-ignore
import a21_2 from './mp3/ق_2.mp3' // @ts-ignore
import a22_1 from './mp3/ك.mp3' // @ts-ignore
import a22_2 from './mp3/ك_2.mp3' // @ts-ignore
import a23_1 from './mp3/ل.mp3' // @ts-ignore
import a23_2 from './mp3/ل_2.mp3' // @ts-ignore
import a24_1 from './mp3/م.mp3' // @ts-ignore
import a24_2 from './mp3/م_2.mp3' // @ts-ignore
import a25_1 from './mp3/ن.mp3' // @ts-ignore
import a25_2 from './mp3/ن_2.mp3' // @ts-ignore
import a26_1 from './mp3/ه.mp3' // @ts-ignore
import a26_2 from './mp3/ه_2.mp3' // @ts-ignore
import a27_1 from './mp3/و.mp3' // @ts-ignore
import a27_2 from './mp3/و_2.mp3' // @ts-ignore
import a28_1 from './mp3/ي.mp3' // @ts-ignore
import a28_2 from './mp3/ي_2.mp3'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    zIndex: 100,
    marginBottom: 80,
    marginTop: 60
    // background: theme.palette.background.default
  },
  alphabet: {
    display: 'grid',
    flexWrap: 'wrap',
    'grid-template-columns': 'repeat(auto-fill, minmax(70px, 1fr))',
    'grid-gap': 10,
  },
  harf: {
    fontSize: 25
  }
}))

const al = [
  { h: 'ا', audio: [a1_1, a1_2] },
  { h: 'ب', audio: [a2_1, a2_2] },
  { h: 'ت', audio: [a3_1, a3_2] },
  { h: 'ث', audio: [a4_1, a4_2] },
  { h: 'ج', audio: [a5_1, a5_2] },
  { h: 'ح', audio: [a6_1, a6_2] },
  { h: 'خ', audio: [a7_1, a7_2] },
  { h: 'د', audio: [a8_1, a8_2] },
  { h: 'ذ', audio: [a9_1, a9_2] },
  { h: 'ر', audio: [a10_1, a10_2] },
  { h: 'ز', audio: [a11_1, a11_2] },
  { h: 'س', audio: [a12_1, a12_2] },
  { h: 'ش', audio: [a13_1, a13_2] },
  { h: 'ص', audio: [a14_1, a14_2] },
  { h: 'ض', audio: [a15_1, a15_2] },
  { h: 'ط', audio: [a16_1, a16_2] },
  { h: 'ظ', audio: [a17_1, a17_2] },
  { h: 'ع', audio: [a18_1, a18_2] },
  { h: 'غ', audio: [a19_1, a19_2] },
  { h: 'ف', audio: [a20_1, a20_2] },
  { h: 'ق', audio: [a21_1, a21_2] },
  { h: 'ك', audio: [a22_1, a22_2] },
  { h: 'ل', audio: [a23_1, a23_2] },
  { h: 'م', audio: [a24_1, a24_2] },
  { h: 'ن', audio: [a25_1, a25_2] },
  { h: 'ه', audio: [a26_1, a26_2] },
  { h: 'و', audio: [a27_1, a27_2] },
  { h: 'ي', audio: [a28_1, a28_2] },
]

const BoopButton = ({ h, audio, className }: {h: any, audio: any, className: any}) => {
  const [play0] = useSound(audio[0])
  const [play1] = useSound(audio[1])
  const [order, setOrder] = useState(0)
  const play = () => {
    if (order) {
      setOrder(0)
    } else {
      setOrder(1)
    }

    switch (order) {
      case 0:
        play0()
        break

      default:
        play1()
        break
    }
  }

  return (
    <Button
      onClick={play}
      variant="outlined"
      className={className}
    >
      {h}
    </Button>
  )
}

const Alphabet = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div
      className={classes.root}
    >
      <h1>
        💪
        {' '}
        { t('alph.Check yourself')}
      </h1>
      <h5>
        {t('alph.Say a letter then check yourself')}
      </h5>
      <div className={classes.alphabet}>

        {
      al.map((h) => (
        <BoopButton
          h={h.h}
          className={classes.harf}
          audio={h.audio}
          key={h.h}
        />
      ))
      }
      </div>
    </div>
  )
}

export default Alphabet
