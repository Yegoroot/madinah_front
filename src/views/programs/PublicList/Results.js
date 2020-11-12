import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Box,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core'
import {
  ToggleButtonGroup,
  ToggleButton,
} from '@material-ui/lab'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import ProgramCard from 'src/components/ProgramCard'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  sortButton: {
    textTransform: 'none',
    letterSpacing: 0,
    marginRight: theme.spacing(2)
  }
}))

function Results({ className, programs, ...rest }) {
  const classes = useStyles()
  const { t } = useTranslation()
  // const sortRef = useRef(null)
  // const [openSort, setOpenSort] = useState(false)
  // const [selectedSort, setSelectedSort] = useState('Most popular')
  const [mode, setMode] = useState('grid')

  // const handleSortOpen = () => {
  //   setOpenSort(true)
  // }

  // const handleSortClose = () => {
  //   setOpenSort(false)
  // }

  // const handleSortSelect = (value) => {
  //   setSelectedSort(value)
  //   setOpenSort(false)
  // }

  const handleModeChange = (event, value) => {
    setMode(value)
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={2}
      >
        <Typography
          className={classes.title}
          variant="h5"
          color="textPrimary"
        >
          {t('programspage.count')}
          {' '}
          {programs.length}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
        >
          {/* <Button
            className={classes.sortButton}
            onClick={handleSortOpen}
            ref={sortRef}
          >
            {selectedSort}
            <ArrowDropDownIcon />
          </Button> */}
          <ToggleButtonGroup
            exclusive
            onChange={handleModeChange}
            size="small"
            value={mode}
          >
            <ToggleButton value="grid">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      {!programs.length && (
      <Typography
        variant="h3"
        color="textPrimary"
      >
        Programs not found, please change your search conditions
      </Typography>
      ) }
      <Grid
        container
        alignItems="stretch"
        spacing={3}
      >
        {programs.map((program) => (
          <Grid
            item
            key={program.id}
            lg={mode === 'grid' ? 3 : 12}
            md={mode === 'grid' ? 4 : 12}
            sm={mode === 'grid' ? 6 : 12}
            xs={12}
          >
            <ProgramCard program={program} />
          </Grid>
        ))}
      </Grid>
      {/* <Box
        mt={6}
        display="flex"
        justifyContent="center"
      >
        <Pagination count={3} />
      </Box> */}
      {/* <Menu
        anchorEl={sortRef.current}
        className={classes.menu}
        onClose={handleSortClose}
        open={openSort}
        elevation={1}
      >
        {['Most recent', 'Popular', 'Price high', 'Price low', 'On sale'].map(
          (option) => (
            <MenuItem
              key={option}
              onClick={() => handleSortSelect(option)}
            >
              <ListItemText primary={option} />
            </MenuItem>
          )
        )}
      </Menu> */}
    </div>
  )
}

Results.propTypes = {
  className: PropTypes.string,
  programs: PropTypes.array.isRequired
}

export default Results
