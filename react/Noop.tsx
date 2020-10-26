const Noop = () => {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      'Do not use the "condition-layout" block directly. Please use the appropriate variation for your context.'
    )
  }

  return null
}

export default Noop
