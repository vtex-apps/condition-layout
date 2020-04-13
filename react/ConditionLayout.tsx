import React, { useReducer } from 'react'

import {
  ConditionDispatchContext,
  ConditionContext,
  reducer,
} from './ConditionContext'
import { useEffectSkipFirstRender } from './modules/useEffectSkipFirstRender'

type Props = {
  values: Values
  subjects: GenericSubjects
}

const ConditionLayout: StorefrontFunctionComponent<Props> = ({
  children,
  subjects,
  values,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    matched: undefined,
    subjects,
    values,
  })

  // we use a useEffect that skips the first render
  // because we don't want to update the `values` twice
  // at component initialization.
  useEffectSkipFirstRender(() => {
    dispatch({
      type: 'SET_VALUES',
      payload: { values },
    })
  }, [values])

  return (
    <ConditionContext.Provider value={state}>
      <ConditionDispatchContext.Provider value={dispatch}>
        {children}
      </ConditionDispatchContext.Provider>
    </ConditionContext.Provider>
  )
}

export default ConditionLayout
