import { FC, useMemo, useEffect } from 'react'

import { testConditions } from './modules/conditions'
import { useConditionContext, useConditionDispatch } from './ConditionContext'

interface Props {
  conditions?: Conditions
  match: MatchType
}

const Condition: FC<Props> = ({ children, conditions, match }) => {
  const { values, subjects } = useConditionContext()
  const dispatch = useConditionDispatch()

  const matches = useMemo(() => {
    if (conditions == null || values == null || subjects == null) {
      return null
    }

    // eslint-disable-next-line no-shadow
    const { matches } = testConditions({
      subjects,
      conditions,
      match,
      values,
    })

    return matches
  }, [conditions, match, subjects, values])

  useEffect(() => {
    dispatch({
      type: 'UPDATE_MATCH',
      payload: { matches: !!matches },
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
