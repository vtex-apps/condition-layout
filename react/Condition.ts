import { useMemo, useEffect } from 'react'

import { testConditions } from './modules/conditions'
import { useConditionContext, useConditionDispatch } from './ConditionContext'

interface Props {
  conditions?: Conditions
  match: MatchType
}

const Condition: StorefrontFunctionComponent<Props> = ({
  children,
  conditions,
  match,
}) => {
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

Condition.schema = {
  title: 'admin/editor.condition-layout.condition',
  type: 'object',
  properties: {
    conditions: {
      title: 'admin/editor.condition-layout.conditions',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          subject: {
            type: 'string',
            title: 'admin/editor.condition-layout.subject',
          },
          verb: {
            default: 'is',
            type: 'string',
            title: 'admin/editor.condition-layout.verb',
            enum: ['is', 'is-not', 'contains', 'does-not-contain'],
          },
          object: {
            type: 'string',
            title: 'admin/editor.condition-layout.object',
          },
        },
      },
    },
    match: {
      default: 'all',
      enum: ['any', 'none', 'all'],
      title: 'admin/editor.condition-layout.match',
      type: 'string',
    },
  },
}

export default Condition
