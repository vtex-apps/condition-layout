import { createContext, useContext, Dispatch } from 'react'

import Noop from './Noop'

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

type Actions =
  | Action<'UPDATE_MATCH', { payload: { matches: boolean | undefined } }>
  | Action<'SET_VALUES', { payload: { values: Record<string, any> } }>

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
  switch (action.type) {
    case 'SET_VALUES': {
      return {
        ...prevState,
        // we need to invalidate the matched property after updating the values
        // because it's possible for none of the conditions to match the new values
        matched: undefined,
        values: action.payload.values,
      }
    }

    case 'UPDATE_MATCH': {
      const { matches } = action.payload

      if (prevState.matched === matches || matches == null) {
        return prevState
      }

      return {
        ...prevState,
        matched: Boolean(prevState.matched) || matches,
      }
    }

    default:
      return prevState
  }
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
