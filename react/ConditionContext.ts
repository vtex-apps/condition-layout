import { createContext, useContext, Dispatch } from 'react'

import Noop from './Noop'

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

type Actions = Action<'UPDATE_MATCH', { payload: { matches: boolean } }>

type ConditionContextValue = {
  matched: null | boolean
  subjects: GenericSubjects
  values: Values
}

export const ConditionContext = createContext<ConditionContextValue>(
  {} as ConditionContextValue
)

export const ConditionDispatchContext = createContext<Dispatch<Actions>>(Noop)

export function reducer(prevState: ConditionContextValue, action: Actions) {
  if (action.type === 'UPDATE_MATCH') {
    if (prevState.matched === action.payload.matches) {
      return prevState
    }

    return {
      ...prevState,
      // we use the pipe operator because we want to explicitly consider false values here
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      matched: prevState.matched || action.payload.matches,
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
