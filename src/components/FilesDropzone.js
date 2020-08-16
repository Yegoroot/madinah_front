/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useDropzone } from 'react-dropzone'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  // IconButton,
  // Tooltip,
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy'
// import MoreIcon from '@material-ui/icons/MoreVert'
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
  className, setFieldValue, one, photo, srcPhoto, ...rest
}) {
  const classes = useStyles()
  const [files, setFiles] = useState([])

  const src = () => {
    if (files[0] && photo) {
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
      if (photo) {
        const file = Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) })
        setFiles([file])
      } else {
        setFiles([acceptedFiles[0]])
      }
    } else { // several files
      setFiles((prevFiles) => [...prevFiles].concat(acceptedFiles))
    }
  }, [one, photo])

  useEffect(() => {
    const name = one ? 'file' : 'files'
    const result = one ? files[0] : files
    if (setFieldValue) { setFieldValue(name, result) }
  }, [files, one, setFieldValue])

  const handleRemoveAll = () => {
    setFiles([])
  }

  const options = {
    // multiple: !photo,
    onDrop: handleDrop,
    accept: 'image/*'
  }
  if (photo) {
    options.accept = 'image/*'
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
          [classes.photoDropZone]: (files[0] && photo) || srcPhoto,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <img
            alt="Select file"
            className={clsx({
              [classes.image]: (!files[0] || !photo) || srcPhoto,
              [classes.fullWidth]: (files[0] && photo) || srcPhoto
            })}
            src={src()}
          />
        </div>
        <div>
          <Typography
            gutterBottom
            variant="h3"
          >
            Select files
          </Typography>
          <Box mt={2}>
            <Typography
              color="textPrimary"
              variant="body1"
            >
              Drop files here or click
              {' '}
              <Link underline="always">browse</Link>
              {' '}
              thorough your machine
            </Typography>
          </Box>
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
