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
  Typography,
  // makeStyles,
  // IconButton,
  // Chip,
  // SvgIcon,
} from '@material-ui/core'

const TextType = ({ content }) => {
  const { subtitle, data/* , id */ } = content

  return (
    <Box>

      <h2
        variant="h2"
        color="textPrimary"
      >
        {subtitle}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </Box>
  )
}

export default TextType
