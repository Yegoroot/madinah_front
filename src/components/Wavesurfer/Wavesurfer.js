import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
// import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'
import { map, orderBy } from 'lodash'
import { randomColor } from 'src/utils/randomColor'
// import store from '../store/rootReducer'
// import { setPlayerState } from '../store/playerStateActions'
// import { setPageParameter } from '../store/pageContentActions'

import soundtouch from './soundtouchFilter'

let wavesurfer

const init = (waveformConteiner, timelineContainer, mediaLink, phrasesArray0,) => {
  // const readModeRegionOptions = { drag: false, resize: false } // should be added to each region
  // if (readOnly) {
  //   phrasesArray = phrasesArray0.map((elem) => ({ ...elem, ...readModeRegionOptions }))
  //   dragSelection = false
  // }
  const phrasesArray = phrasesArray0
  const dragSelection = true

  wavesurfer = WaveSurfer.create({
    container: waveformConteiner,
    scrollParent: true,
    rtl: true,
    height: 100,
    //   minPxPerSec: 200,
    plugins: [
      RegionsPlugin.create({
        regions: phrasesArray,
        dragSelection,
      }),
      // TimelinePlugin.create({
      //   container: timelineContainer,
      // }),
    ],
  })

  wavesurfer.load(mediaLink)

  // edit mode

  const regionsToPhrasesArray = () => {
    // WARN const { phrases: oldPhrases } = store.getState().pageContent
    let phrases = map(wavesurfer.regions.list, (elem, key) => {
      const { start, end, color } = elem
      const id = key

      // const oldPhrase = oldPhrases.find((elem) => id === elem.id)
      const oldPhrase = phrases
      return {
        ...oldPhrase, id, start, end, color
      }
    })
    phrases = orderBy(phrases, 'start')
    // WARN store.dispatch(setPageParameter(['phrases', phrases]))
  }

  wavesurfer.on('region-update-end', (region) => {
    console.log('region-update-end')
    regionsToPhrasesArray()
  })

  wavesurfer.on('region-created', (region) => {
    region.update({ color: randomColor(0.5) })
  })

  wavesurfer.on('region-dblclick', (region) => {
    // WARN
    /*
    let { selectedPhrases } = store.getState().pageContent
    if (selectedPhrases.includes(region.id)) {
      selectedPhrases = selectedPhrases.filter((elem) => elem !== region.id)
    } else {
      selectedPhrases = selectedPhrases.concat(region.id)
    }

   store.dispatch(setPageParameter(['selectedPhrases', selectedPhrases]))
    */
  })

  wavesurfer.on('region-removed', (region) => {
    regionsToPhrasesArray()
  })

  // Time stretcher (preserve pitch on speeds != 1 )
  wavesurfer.on('ready', () => {
    // WARN store.dispatch(setPageParameter(['duration', +wavesurfer.getDuration().toFixed(3)]))
    const st = new soundtouch.SoundTouch(wavesurfer.backend.ac.sampleRate)
    const { buffer } = wavesurfer.backend
    const channels = buffer.numberOfChannels
    const l = buffer.getChannelData(0)
    const r = channels > 1 ? buffer.getChannelData(1) : l
    const { length } = buffer
    let seekingPos = null
    let seekingDiff = 0

    const source = {
      extract(target, numFrames, position) {
        if (seekingPos != null) {
          seekingDiff = seekingPos - position
          seekingPos = null
        }

        position += seekingDiff

        for (let i = 0; i < numFrames; i++) {
          target[i * 2] = l[i + position]
          target[i * 2 + 1] = r[i + position]
        }

        return Math.min(numFrames, length - position)
      },
    }

    let soundtouchNode

    wavesurfer.on('play', () => {
      seekingPos = ~~(wavesurfer.backend.getPlayedPercents() * length)
      st.tempo = wavesurfer.getPlaybackRate()

      if (st.tempo === 1) {
        wavesurfer.backend.disconnectFilters()
      } else {
        if (!soundtouchNode) {
          const filter = new soundtouch.SimpleFilter(source, st)
          soundtouchNode = soundtouch.getWebAudioNode(wavesurfer.backend.ac, filter)
        }
        wavesurfer.backend.setFilter(soundtouchNode)
      }
    })

    wavesurfer.on('pause', () => {
      soundtouchNode && soundtouchNode.disconnect()
    })

    wavesurfer.on('seek', () => {
      seekingPos = ~~(wavesurfer.backend.getPlayedPercents() * length)
    })
  })

  // WARN
  /*
  const { playbackRate, volume } = store.getState().playerSettings
   wavesurfer.setPlaybackRate(playbackRate)
   wavesurfer.setVolume(volume) */

  return wavesurfer
}

export default { wavesurfer, init }
