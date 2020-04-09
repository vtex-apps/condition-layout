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
