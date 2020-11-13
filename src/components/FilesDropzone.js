/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useDropzone } from 'react-dropzone'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { useTranslation } from 'react-i18next'
import bytesToSize from 'src/utils/bytesToSize'

const useStyles = makeStyles((theme) => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  photoDropZone: {
    padding: theme.spacing(2),
  },
  dragActive: {
    backgroundColor: theme.palette.action.active,
    opacity: 0.5
  },
  image: {
    width: 130
  },
  fullWidth: {
    // width: '100%',
    width: `calc(100% + ${theme.spacing(4)}px)`,
    marginLeft: -theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: -theme.spacing(2)
  },
  info: {
    marginTop: theme.spacing(1)
  },
  list: {
    maxHeight: 320
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}))

function FilesDropzone({
  className, setFieldValue, one, type, srcPhoto, ...rest
}) {
  const classes = useStyles()
  const [files, setFiles] = useState([])
  const { t } = useTranslation()

  const src = () => {
    if (files[0] && type === 'photo') {
      return files[0].preview
    }
    if (srcPhoto) {
      return srcPhoto
    }
    return '/static/images/undraw_add_file2_gvbb.svg'
  }

  const handleDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles[0]) return // если не прошел проверку
    if (one) {
      if (type === 'photo') {
        const file = Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) })
        setFiles([file])
      } else {
        setFiles([acceptedFiles[0]])
      }
    } else { // several files
      setFiles((prevFiles) => [...prevFiles].concat(acceptedFiles))
    }
  }, [one, type])

  useEffect(() => {
    const name = one ? 'file' : 'files'
    const result = one ? files[0] : files
    if (setFieldValue) { setFieldValue(name, result) }
    // eslint-disable-next-line
  }, [files, one])

  const handleRemoveAll = () => {
    setFiles([])
  }

  const options = {
    // multiple: !photo,
    onDrop: handleDrop,
    // accept: 'image/*'
  }
  if (type === 'photo') {
    options.accept = 'image/*'
  }
  if (type === 'audio') {
    options.accept = 'audio/*'
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone(options)

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.photoDropZone]: (files[0] && type === 'photo') || srcPhoto,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          {type === 'photo'
            ? (
              <img
                alt="Select file"
                className={clsx({
                  [classes.image]: (!files[0] || !(type === 'photo')) || srcPhoto,
                  [classes.fullWidth]: (files[0] && (type === 'photo')) || srcPhoto
                })}
                src={src()}
              />
            ) : null}
        </div>
        <div>
          <Typography
            gutterBottom
            variant="h4"
          >
            {/*  eslint-disable-next-line no-nested-ternary */}
            {files.length
              ? t('dropImage.change file')
              : one
                ? t('dropImage.select one file')
                : t('dropImage.select files')}

          </Typography>

        </div>
      </div>
      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {files.map((file, i) => (
                <ListItem
                  divider={i < files.length - 1}
                  key={i}
                >
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.size)}
                  />
                  {/* <Tooltip title="More options">
                    <IconButton edge="end">
                      <MoreIcon />
                    </IconButton>
                  </Tooltip> */}
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <div className={classes.actions}>
            <Button
              onClick={handleRemoveAll}
              size="small"
            >
              {one ? 'Remove' : 'Remove all' }
            </Button>
            {/* <Button
              color="secondary"
              size="small"
              variant="contained"
            >
              Upload files
            </Button> */}
          </div>
        </>
      )}
    </div>
  )
}

FilesDropzone.propTypes = {
  className: PropTypes.string
}

export default FilesDropzone
