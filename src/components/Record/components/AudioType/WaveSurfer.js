/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { randomColor } from 'src/utils/randomColor'
import LoadingScreen from 'src/components/LoadingScreen'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import clsx from 'clsx'
import useSettings from 'src/hooks/useSettings'
import Form from './Components/Form'
import Header from './Components/Header'
import Annotations from './Components/Annotations'

const MyWaveSurfer = ({
  mediaLink, dataAnnotations, subtitle, isEdit, onSaveChangesOut
}) => {
  const waveformElem = useRef(null)
  const initCurrentRegion = {
    play: () => '', data: { original: '', /* translate: '' */ }, start: '', end: ''
  }
  const [annotations, setAnnotations] = useState([...dataAnnotations])
  const [isPlay, setIsplay] = useState(false)
  const [minValueSlider, setMinValueSlider] = useState(0)
  const [valueSlider, setValueSlider] = useState(0)
  const [isShowForm, setIsShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentRegion, setCurrentRegion] = useState(initCurrentRegion)
  const { settings } = useSettings()

  const useStyles = makeStyles(() => ({
    wavesurfer: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    wave: {
      width: 'calc(100% - 74px)',
      direction: settings.direction
    }
  }))

  const classes = useStyles()

  const handleSlider = (e, newValue) => {
    setValueSlider(newValue)
    waveformElem.current.zoom(Number(newValue))
  }

  const onDelete = () => {
    setIsShowForm(false)
    currentRegion.remove()
    setCurrentRegion(initCurrentRegion)
  }

  const onPlay = () => {
    if (isPlay) {
      waveformElem.current.pause()
    } else {
      waveformElem.current.play()
    }
  }

  const calculateAnnotations = () => {
    const newAnnotations = Object.keys(waveformElem.current.regions.list).map((id) => {
      const region = waveformElem.current.regions.list[id]
      return {
        color: region.color,
        start: region.start,
        end: region.end,
        attributes: region.attributes,
        data: region.data
      }
    })
    return newAnnotations
  }

  function saveRegions() {
    setAnnotations(calculateAnnotations())
  }

  const onSave = (value) => {
    setIsShowForm(false)
    currentRegion.update(value) // скорее всего это асинхронно
    onSaveChangesOut(annotations) // приходится на лету заново вычислять (иначе не )
    onSaveChangesOut(calculateAnnotations()) // приходится на лету заново вычислять (иначе не )
    setCurrentRegion(initCurrentRegion)
  }

  const [html, setHtml] = useState('')

  useEffect(() => {
    waveformElem.current = WaveSurfer.create({
      container: waveformElem.current,
      scrollParent: true,
      rtl: settings.direction === 'rtl',
      pixelRatio: 1,
      normalize: true,
      height: isEdit ? 100 : 34,
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

    waveformElem.current.on('ready', () => {
      if (!waveformElem.current) {
        return
      }
      console.log('ready')
      setIsLoading(false)
      setValueSlider(waveformElem.current.params.minPxPerSec)
      setMinValueSlider(waveformElem.current.params.minPxPerSec)
      saveRegions()

      waveformElem.current.on('region-click', (region, e) => {
        setHtml(region.data.original)
        e.stopPropagation()
        region.play()
        setIsShowForm(true)
        setCurrentRegion(region)
      })
      waveformElem.current.on('region-in', (region) => {
        setHtml(region.data.original)
      })
      waveformElem.current.on('region-updated', saveRegions)
      waveformElem.current.on('region-removed', saveRegions)
      waveformElem.current.on('region-play', (/* region */) => {
        // region.once('out', () => { setHtml('')/ })
      })
      // waveformElem.current.on('region-update-end', () => {
      waveformElem.current.on('region-created',
        (region) => {
          region.update({ color: randomColor(0.5) })
          setCurrentRegion(region)
        })
      waveformElem.current.on('seek', () => { setIsShowForm(false) })
      waveformElem.current.on('play', () => { setIsplay(true) })
      waveformElem.current.on('pause', () => { setIsplay(false) })
    })

    return () => waveformElem?.current?.destroy()
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

      <Box
        mb={2}
        className={clsx({
          [classes.wavesurfer]: !isEdit,
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
              minValueSlider={minValueSlider}
              valueSlider={valueSlider}
              handleSlider={handleSlider}
            />
          )}
        <div
          className={clsx({
            'not-ar': !isEdit,
            [classes.wave]: true
          })}
          ref={waveformElem}
        />
      </Box>

      <Annotations html={html} />

      {isEdit && isShowForm && (
        <Form
          onSave={onSave}
          onDelete={onDelete}
          currentRegion={currentRegion}
        />
      )}

    </>
  )
}

export default MyWaveSurfer
