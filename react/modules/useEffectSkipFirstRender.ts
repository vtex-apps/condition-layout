import { useRef, useEffect } from 'react'

export const useEffectSkipFirstRender = (
  fn: React.EffectCallback,
  deps: React.DependencyList
) => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    return fn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
