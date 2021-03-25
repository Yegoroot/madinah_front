import React, { memo } from 'react'
import { Box, Typography } from '@material-ui/core'
import clsx from 'clsx'
import DOMPurify from 'dompurify'

// console.log('HTML in Annotations', html)
const Annotations = ({ html }) => {
  const clean = DOMPurify.sanitize(html)
  return (

    <Box
      mt={4}
      mb={4}
    >
      <div
        dangerouslySetInnerHTML={{ __html: clean }}
        className={clsx({
          ar: true
        })}
      />
    </Box>

  )
}

export default memo(Annotations)
