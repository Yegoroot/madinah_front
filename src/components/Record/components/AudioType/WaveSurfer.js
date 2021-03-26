/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { randomColor } from 'src/utils/randomColor'
import LoadingScreen from 'src/components/LoadingScreen'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import clsx from 'clsx'
import useSettings from 'src/hooks/useSettings'
import { useSelector, useDispatch } from 'src/store'
import { setAudioActive } from 'src/slices/topic'
import Form from './Components/Form'
import Header from './Components/Header'
import Annotations from './Components/Annotations'

const MyWaveSurfer = ({
  mediaLink, dataAnnotations, subtitle, isEdit, onSaveChangesOut, id
}) => {
  const waveformElem = useRef(null)
  const initCurrentRegion = {
    play: () => '', data: { original: '', /* translate: '' */ }, start: '', end: ''
  }
  const [annotations, setAnnotations] = useState([...dataAnnotations])
  const [minValueSlider, setMinValueSlider] = useState(0)
  const [valueSlider, setValueSlider] = useState(0)
  const [isShowForm, setIsShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentRegion, setCurrentRegion] = useState(initCurrentRegion)
  const { settings } = useSettings()
  /** fixed audio player */
  const dispatch = useDispatch()
  const contents = useSelector((state) => state.topic.item.data.contents)
  const currentContent = contents.find((c) => c._id === id) || {}
  const { isActive, isPlay } = currentContent
  // const [isPlay, setIsplay] = useState(false)

  const useStyles = makeStyles((theme) => ({
    wavesurfer: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    wavesurferActive: {
      position: 'fixed',
      right: 0,
      padding: 10,
      width: '100%',
      bottom: 0,
      // opacity: 0.94,
      margin: 0,
      [theme.breakpoints.up('lg')]: {
        width: 'calc(100% - 256px)'
      },
      background: theme.palette.background.default,
      zIndex: 1000,
    },
    wave: {
      width: 'calc(100% - 74px)',
      direction: settings.direction,
      filter: ' grayscale(1)'
    },
    waveActive: {
      filter: 'grayscale(0.3)',
      width: 'calc(100% - 150px)',
      '& wave': {
        borderRadius: 4
      }
    }
  }))

  const classes = useStyles()

  /** */
  // console.log(currentContent)

  const onCloseFixedPlayer = () => {
    waveformElem.current.pause()
    dispatch(setAudioActive({ id, isActive: false, isPlay: false }))
  }

  const handleSlider = (e, newValue) => {
    setValueSlider(newValue)
    waveformElem.current.zoom(Number(newValue))
  }

  const onDelete = () => {
    setIsShowForm(false)
    currentRegion.remove()
    setCurrentRegion(initCurrentRegion)
  }

  /** отключать waveformElem, так как из вне его не отключишь */
  useEffect(() => {
    if (typeof isPlay === 'boolean' && !isActive && !isPlay && typeof waveformElem.current.pause === 'function') {
      waveformElem.current.pause()
    }
  }, [isPlay])

  const onPlay = () => {
    if (isPlay) {
      dispatch(setAudioActive({ id, isPlay: false }))
      waveformElem.current.pause()
    } else {
      dispatch(setAudioActive({ id, isActive: true, isPlay: true }))
      waveformElem.current.play()
    }
  }

  const calculateAnnotations = () => {
    const newAnnotations = Object.keys(waveformElem.current.regions.list).map((rId) => {
      const region = waveformElem.current.regions.list[rId]
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
      waveformElem.current.on('play', () => {
        if (!isPlay) dispatch(setAudioActive({ id, isPlay: true }))
      })
      waveformElem.current.on('pause', () => {
        dispatch(setAudioActive({ id, isPlay: false, handlyOnlyThis: true }))
        // if (isPlay) { dispatch(setAudioActive({ id, isPlay: false })) }
      })
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
          [classes.wavesurferActive]: isActive
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
              onClose={onCloseFixedPlayer}
              isActive={isActive}
            />
          )}
        <div
          className={clsx({
            'not-ar': !isEdit,
            [classes.wave]: true,
            [classes.waveActive]: isActive
          })}
          ref={waveformElem}
        />
      </Box>

      <Annotations
        html={html}
        isActive={isActive}
      />

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
