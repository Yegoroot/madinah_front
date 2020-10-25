import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'

let wavesurfer

const init = (waveformConteiner, mediaLink, isEdit, annotations) => {
  const readOnly = { drag: false, resize: false } // should be added to each region

  wavesurfer = WaveSurfer.create({
    container: waveformConteiner,
    scrollParent: true,
    rtl: true,
    pixelRatio: 1,
    normalize: true,
    height: isEdit ? 100 : 50,
    backend: 'MediaElement',
    //   minPxPerSec: 200,
    plugins: [
      RegionsPlugin.create({
        regions: isEdit
          ? annotations.map((elem) => ({ ...elem }))
          : annotations.map((elem) => ({ ...elem, ...readOnly })),
        dragSelection: isEdit,
      })
    ],
  })

  wavesurfer.load(mediaLink)

  return wavesurfer
}

export default { wavesurfer, init }
