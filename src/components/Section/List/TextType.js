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
  const { subtitle, /* data, id */ } = content

  return (
    <Box>
      <Typography
        variant="body1"
        color="primaryText"
      >
        {subtitle}
      </Typography>
    </Box>
  )
}

export default TextType
