import { useMemo, useEffect } from 'react'
import { useRuntime } from 'vtex.render-runtime'

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
  const { getSettings } = useRuntime()
  const { conditionLayoutV1Behaviour } = getSettings('vtex.store')

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

  /** If the behaviour is set to `then-bias`, it renders the "then" case(s) on SSR if the condition matches,
   * and might flip the result on the client depending on the result from the context.
   * Otherwise, none of the conditions are rendered on SSR.
   * Should be set if the condition is simple, the "then" result is the most common, and the fail scenario is ok */
  const thenBias = conditionLayoutV1Behaviour === 'then-bias' 

  // We use ctxMatch to prevent having both condition.xxx and condition.else blocks rendered at the same time.
  if ((!thenBias && !ctxMatch) || !localMatch) {
    return null
  }

  return (children as never) ?? null
}

export default Condition
