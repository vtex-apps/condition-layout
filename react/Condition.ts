import { FC, useMemo } from 'react'

import { testConditions } from './modules/conditions'
import { useCondition } from './ConditionContext'

interface Props {
  conditions?: Conditions<GenericSubjects>
  matching: MatchType
}

const Condition: FC<Props> = ({ children, conditions, matching = 'all' }) => {
  const { values, subjects } = useCondition()

  const matches = useMemo(() => {
    if (conditions == null || values == null || subjects == null) {
      return null
    }

    // eslint-disable-next-line no-shadow
    const { matches } = testConditions({
      subjects,
      conditions,
      matching,
      values,
    })

    return matches
  }, [conditions, matching, subjects, values])

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
