import { useRef, useEffect, DependencyList, EffectCallback } from 'react'

export const useEffectSkipFirstRender = (
  fn: EffectCallback,
  deps: DependencyList
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
