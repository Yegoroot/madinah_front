export const errorMessage = (message) => enqueueSnackbar({
  message,
  options: {
    autoHideDuration: 6000,
    key: new Date().getTime() + Math.random(),
    variant: 'error'
  },
})
