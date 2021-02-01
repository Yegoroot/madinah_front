/* eslint-disable react/prop-types */
import React from 'react'
import {
  Box,
  // Button,
  // Select,
  // InputLabel,
  // Input,
  // FormControl,
  // MenuItem,
  // Card,
  // CardContent,
  // CardHeader,
  // Divider,
  // FormControlLabel,
  // Switch,
  // FormHelperText,
  // Grid,
  // Paper,
  // TextField,
  // Typography,
  // makeStyles,
  // IconButton,
  // Chip,
  // SvgIcon,
} from '@material-ui/core'
import DOMPurify from 'dompurify'

const TextType = ({ content }) => {
  const { subtitle, data/* , _id */ } = content
  const clean = DOMPurify.sanitize(data)

  return (
    <Box>
      {subtitle ? (
        <h2 className="subtitle">{subtitle}</h2>
      ) : null}
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: clean }} />
    </Box>
  )
}

export default TextType
