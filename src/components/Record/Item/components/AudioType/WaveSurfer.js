import React, { useRef, useEffect, useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { randomColor } from 'src/utils/randomColor'
import LoadingScreen from 'src/components/LoadingScreen'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import clsx from 'clsx'
import Form from './Components/Form'
import Header from './Components/Header'
import Annotations from './Components/Annotations'

const useStyles = makeStyles((theme) => ({
  wavesurfer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse'
  }
}))

const MyWaveSurfer = ({
  mediaLink, dataAnnotations, subtitle, isEdit, onSaveChangesOut
}) => {
  const classes = useStyles()
  const waveformElem = useRef(null)
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
    waveformElem.current.zoom(Number(newValue))
  }

  const onSaveChanges = () => {
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
      waveformElem.current.pause()
    } else {
      waveformElem.current.play()
    }
  }

  function showNote(region) {
    noteOriginal.current.textContent = (region && region.data.original) || ''
    noteTranslate.current.textContent = (region && region.data.translate) || ''
  }

  function saveRegions() {
    setAnnotations(Object.keys(waveformElem.current.regions.list).map((id) => {
      const region = waveformElem.current.regions.list[id]
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
    /**
     */
    waveformElem.current = WaveSurfer.create({
      container: waveformElem.current,
      scrollParent: true,
      rtl: true,
      pixelRatio: 1,
      normalize: true,
      height: isEdit ? 100 : 50,
      backend: 'MediaElement',
      plugins: [
        RegionsPlugin.create({
          regions: isEdit
            ? annotations.map((elem) => ({ ...elem }))
            : annotations.map((elem) => ({ ...elem, drag: false, resize: false })),
          dragSelection: isEdit,
        })
      ],
    })

    waveformElem.current.load(mediaLink)

    waveformElem.current.on('ready', (e) => {
      console.log('ready')
      setIsLoading(false)
      setValueSlider(waveformElem.current.params.minPxPerSec)
      setMinValueSlider(waveformElem.current.params.minPxPerSec)
      // loadRegions(annotations)
      saveRegions()
    })
    waveformElem.current.on('region-click', (region, e) => {
      e.stopPropagation()
      region.play()
      setIsShowForm(true)
      editAnnotation(region)
      showNote(region)
    })
    waveformElem.current.on('region-in', showNote)
    waveformElem.current.on('region-updated', saveRegions)
    waveformElem.current.on('region-removed', saveRegions)
    waveformElem.current.on('region-play', (region) => {
      region.once('out', () => { showNote(null) })
    })
    waveformElem.current.on('region-update-end', () => { setIsShowForm(false) })
    waveformElem.current.on('region-created', (region) => { region.update({ color: randomColor(0.5) }) })
    waveformElem.current.on('seek', () => { setIsShowForm(false) })
    waveformElem.current.on('play', () => { setIsplay(true) })
    waveformElem.current.on('pause', () => { setIsplay(false) })

    return () => waveformElem.current.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaLink])

  return (
    <>
      {subtitle && (
      <h2
        className="subtitle"
        style={{ paddingBottom: 20 }}
      >
        {subtitle}
      </h2>
      )}

      {/* root : {

}

width: 70px;
    margin-left: 20px;
    transform: scale(-1); */}

      <Box
        mb={2}
        className={clsx({
          [classes.wavesurfer]: !isEdit
        })}
      >
        { isLoading
          ? <LoadingScreen />
          : (
            <Header
              className={classes.wavesurfer}
              isPlay={isPlay}
              onPlay={onPlay}
              isEdit={isEdit}
              onSaveChanges={onSaveChanges}
              minValueSlider={minValueSlider}
              valueSlider={valueSlider}
              handleSlider={handleSlider}
            />
          )}
        <div
          className="not-ar"
          style={{ width: '100%' }}
          ref={waveformElem}
        />
      </Box>

      <Annotations
        noteOriginal={noteOriginal}
        noteTranslate={noteTranslate}
      />

      {isEdit && isShowForm && (
        <Form
          onSave={onSave}
          onDelete={onDelete}
          onChange={onChange}
          values={values}
        />
      )}

    </>
  )
}

export default MyWaveSurfer
