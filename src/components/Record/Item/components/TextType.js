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

const TextType = ({ content }) => {
  const { subtitle, data/* , _id */ } = content

  return (
    <Box>
      {subtitle ? (
        <h2 className="subtitle">{subtitle}</h2>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </Box>
  )
}

export default TextType
