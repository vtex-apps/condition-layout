import { Condition, MatchType } from '../types'

export function validateConditions({
  matchType = 'all',
  conditions,
  values,
  handlers,
}: {
  matchType?: MatchType
  conditions: Condition[]
  values: Record<string, unknown>
  handlers: Record<string, unknown>
}) {
  const matches = conditions.reduce((acc: boolean | null, condition) => {
    const { subject, arguments: args, toBe = true } = condition
    const handler = handlers[subject]

    // istanbul ignore next
    if (typeof handler !== 'function') {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          `Invalid subject "${subject}". Must be one of "${Object.keys(
            handlers
          ).join(', ')}".`
        )
      }

      return acc
    }

    const conditionMatch = handler({ values, args }) === toBe

    if (matchType === 'any') {
      return (acc ?? false) || conditionMatch
    }

    if (matchType === 'none') {
      return (acc ?? true) && !conditionMatch
    }

    // matchType === all
    return (acc ?? true) && conditionMatch
  }, null)

  return matches
}
