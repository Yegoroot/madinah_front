import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'

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
    pixelRatio: 1,
    normalize: true,
    height: 100,
    backend: 'MediaElement',
    //   minPxPerSec: 200,
    plugins: [
      RegionsPlugin.create({
        regions: phrasesArray,
        dragSelection,
      })
    ],
  })

  wavesurfer.load(mediaLink)

  return wavesurfer
}

export default { wavesurfer, init }
