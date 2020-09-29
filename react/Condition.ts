import { useMemo, useEffect } from 'react'

import { testConditions } from './modules/conditions'
import { useConditionContext, useConditionDispatch } from './ConditionContext'

export interface ConditionProps {
  conditions?: Conditions
  match?: MatchType
  enabled?: boolean
}

const Condition: StorefrontFunctionComponent<ConditionProps> = ({
  children,
  conditions,
  match,
  enabled = true,
}) => {
  const { values, subjects, matched: ctxMatch } = useConditionContext()
  const dispatch = useConditionDispatch()

  const localMatch = useMemo(() => {
    if (!enabled) {
      return false
    }

    if (conditions == null || values == null || subjects == null) {
      return undefined
    }

    const hasMatched = testConditions({ subjects, conditions, match, values })

    return hasMatched
  }, [conditions, enabled, match, subjects, values])

  useEffect(() => {
    dispatch({
      type: 'UPDATE_MATCH',
      payload: { matches: localMatch },
    })
    // we depend on `values` to trigger an update of the context `matched` value
    // TODO: maybe rewrite this whole thing
  }, [dispatch, localMatch, values])

  if (conditions == null) {
    // TODO: Handle error better
    console.warn('Missing conditions')

    return null
  }

  // We use ctxMatch to prevent having both condition.xxx and condition.else blocks rendered at the same time.
  if (!ctxMatch || !localMatch) {
    return null
  }

  return (children as never) ?? null
}

export default Condition
