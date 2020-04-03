import { createContext, useContext } from 'react'

export const ConditionContext = createContext<ConditionContextValue>(
  {} as ConditionContextValue
)

export function useCondition() {
  const ctx = useContext(ConditionContext)

  if (ctx == null) {
    console.error(
      'No Condition context was found. The "condition" block must be placed within a "condition-layout" block variant.'
    )
  }

  return ctx
}
