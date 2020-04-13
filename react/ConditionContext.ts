import { createContext, useContext, Dispatch } from 'react'

import Noop from './Noop'

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

type Actions = Action<'UPDATE_MATCH', { payload: { matches: boolean | null } }>

type ConditionContextValue = {
  matched: boolean | undefined
  subjects: GenericSubjects
  values: Values
}

export const ConditionContext = createContext<ConditionContextValue>(
  {} as ConditionContextValue
)

export const ConditionDispatchContext = createContext<Dispatch<Actions>>(Noop)

export function reducer(
  prevState: ConditionContextValue,
  action: Actions
): ConditionContextValue {
  const { matches } = action.payload

  if (action.type === 'UPDATE_MATCH') {
    if (prevState.matched === matches || matches == null) {
      return prevState
    }

    if (prevState.matched == null) {
      return { ...prevState, matched: matches }
    }

    return {
      ...prevState,
      matched: prevState.matched || matches,
    }
  }

  return prevState
}

export function useConditionContext() {
  const ctx = useContext(ConditionContext)

  if (ctx == null) {
    console.error(
      'No Condition context was found. The "condition" block must be placed within a "condition-layout" block variant.'
    )
  }

  return ctx
}

export function useConditionDispatch() {
  return useContext(ConditionDispatchContext)
}
