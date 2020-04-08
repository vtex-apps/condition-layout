import React, { FC, useReducer } from 'react'

import {
  ConditionDispatchContext,
  ConditionContext,
  reducer,
} from './ConditionContext'

type Props = {
  values: Values
  subjects: GenericSubjects
}

const ConditionLayout: FC<Props> = ({ children, subjects, values }) => {
  const [state, dispatch] = useReducer(reducer, {
    matched: undefined,
    subjects,
    values,
  })

  return (
    <ConditionContext.Provider value={state}>
      <ConditionDispatchContext.Provider value={dispatch}>
        {children}
      </ConditionDispatchContext.Provider>
    </ConditionContext.Provider>
  )
}

export default ConditionLayout
