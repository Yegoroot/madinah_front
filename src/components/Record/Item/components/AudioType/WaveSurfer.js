import React, { useRef, useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { randomColor } from 'src/utils/randomColor'
import LoadingScreen from 'src/components/LoadingScreen'
import wavesurferModule from './Init'
import Form from './Components/Form'
import Header from './Components/Header'
import Annotations from './Components/Annotations'

const WaveSurfer = ({ mediaLink, dataAnnotations, onSaveChangesOut }) => {
  const waveformElem = useRef(null)
  const timelineElem = useRef(null)
  const noteOriginal = useRef(null)
  const noteTranslate = useRef(null)
  const initialValues = {
    start: '',
    end: '',
    data: {
      original: '',
      translate: ''
    }
  }
  const [annotations, setAnnotations] = useState([...dataAnnotations])
  const [isPlay, setIsplay] = useState(false)
  const [minValueSlider, setMinValueSlider] = useState(0)
  const [valueSlider, setValueSlider] = useState(0)
  const [values, setValues] = useState(initialValues)
  const [isShowForm, setIsShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentRegion, setCurrentRegion] = useState({})

  const onChange = (e) => {
    if (e.target.name === 'original' || e.target.name === 'translate') {
      setValues({
        ...values,
        data: {
          ...values.data,
          [e.target.name]: e.target.value
        }
      })
      return
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSlider = (e, newValue) => {
    setValueSlider(newValue)
    wavesurferModule.wavesurfer.zoom(Number(newValue))
  }

  const onSaveChanges = () => {
    // console.log(annotations, dataAnnotations)
    onSaveChangesOut(annotations)
  }

  const onSave = () => {
    onSaveChangesOut(annotations)
    currentRegion.update(values)
    setCurrentRegion({})
    setIsShowForm(false)
    setValues(initialValues)
  }

  const onDelete = () => {
    currentRegion.remove()
    setIsShowForm(false)
    setCurrentRegion({})
    setValues(initialValues)
  }

  const onPlay = () => {
    if (isPlay) {
      wavesurferModule.wavesurfer.pause()
    } else {
      wavesurferModule.wavesurfer.play()
    }
  }

  function loadRegions(regions) {
    console.log(regions)
    regions.forEach((region) => {
      const color = region.color || randomColor(0.1)
      const _r = { ...region, color }
      wavesurferModule.wavesurfer.addRegion(_r)
    })
  }

  function showNote(region) {
    noteOriginal.current.textContent = (region && region.data.original) || ''
    noteTranslate.current.textContent = (region && region.data.translate) || ''
  }

  function saveRegions() {
    setAnnotations(Object.keys(wavesurferModule.wavesurfer.regions.list).map((id) => {
      const region = wavesurferModule.wavesurfer.regions.list[id]
      return {
        color: region.color,
        start: region.start,
        end: region.end,
        attributes: region.attributes,
        data: region.data
      }
    }))
  }

  /**
 * Edit annotation for a region.
 */
  function editAnnotation(region) {
    const start = Math.round(region.start * 10) / 10
    const end = Math.round(region.end * 10) / 10
    const { data } = region
    setValues({ start, end, data })
    setCurrentRegion(region)
    return false
  }

  useEffect(() => {
    const initWaveform = (url) => {
      wavesurferModule.wavesurfer = wavesurferModule.init(
        waveformElem.current,
        timelineElem.current,
        url
      )
      wavesurferModule.wavesurfer.on('ready', (e) => {
        console.log('ready')
        setIsLoading(false)
        setValueSlider(wavesurferModule.wavesurfer.params.minPxPerSec)
        setMinValueSlider(wavesurferModule.wavesurfer.params.minPxPerSec)
        loadRegions(annotations)
        saveRegions()
      })
    }

    initWaveform(mediaLink)

    /**
     * EVENTS
     */
    // wavesurferModule.wavesurfer.on('loading', (progress) => {
    //   console.log('loading')
    // })
    wavesurferModule.wavesurfer.on('region-click', (region, e) => {
      e.stopPropagation()
      region.play()
      setIsShowForm(true)
      editAnnotation(region)
      showNote(region)
    })
    wavesurferModule.wavesurfer.on('region-in', showNote)
    wavesurferModule.wavesurfer.on('region-updated', saveRegions)
    wavesurferModule.wavesurfer.on('region-removed', saveRegions)
    wavesurferModule.wavesurfer.on('region-play', (region) => {
      region.once('out', () => {
        wavesurferModule.wavesurfer.play(region.start)
        wavesurferModule.wavesurfer.pause()
        showNote(null)
      })
    })
    // wavesurferModule.wavesurfer.on('region-out'

    wavesurferModule.wavesurfer.on('region-update-end', (region) => {
      setIsShowForm(false)
    })

    wavesurferModule.wavesurfer.on('region-created', (region) => {
      region.update({ color: randomColor(0.5) })
    })

    // CLICK ON wavesurfer (not region)
    wavesurferModule.wavesurfer.on('seek', () => {
      setIsShowForm(false)
    })

    wavesurferModule.wavesurfer.on('play', () => {
      setIsplay(true)
    })

    wavesurferModule.wavesurfer.on('pause', () => {
      setIsplay(false)
    })

    return () => {
      if (mediaLink) {
        wavesurferModule.wavesurfer.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaLink])
  return (
    <>
      <Header
        isPlay={isPlay}
        onPlay={onPlay}
        onSaveChanges={onSaveChanges}
        minValueSlider={minValueSlider}
        valueSlider={valueSlider}
        handleSlider={handleSlider}
      />
      {isLoading ? <LoadingScreen /> : null }

      <Box mb={2}>
        <div
          className="not-ar"
          ref={waveformElem}
        />
      </Box>

      <Annotations
        noteOriginal={noteOriginal}
        noteTranslate={noteTranslate}
      />

      {isShowForm ? (
        <Form
          onSave={onSave}
          onDelete={onDelete}
          onChange={onChange}
          values={values}
        />
      ) : null}

    </>
  )
}

export default WaveSurfer
