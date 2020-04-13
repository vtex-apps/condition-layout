import { useMemo, useEffect } from 'react'

import { testConditions } from './modules/conditions'
import { useConditionContext, useConditionDispatch } from './ConditionContext'

export interface ConditionProps {
  conditions?: Conditions
  match: MatchType
  enabled?: boolean
}

const Condition: StorefrontFunctionComponent<ConditionProps> = ({
  children,
  conditions,
  match,
  enabled = true,
}) => {
  const { values, subjects } = useConditionContext()
  const dispatch = useConditionDispatch()

  const matches = useMemo(() => {
    if (!enabled) {
      return false
    }

    if (conditions == null || values == null || subjects == null) {
      return undefined
    }

    const hasMatched = testConditions({
      subjects,
      conditions,
      match,
      values,
    })

    return hasMatched
  }, [conditions, enabled, match, subjects, values])

  useEffect(() => {
    dispatch({
      type: 'UPDATE_MATCH',
      payload: { matches },
    })
  }, [dispatch, matches])

  if (conditions == null) {
    // TODO: Handle error better
    console.warn('Missing conditions')
    return null
  }

  if (!matches) {
    return null
  }

  return (children as any) ?? null
}

export default Condition
