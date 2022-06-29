import React, { useMemo } from 'react'
import type { ComponentType } from 'react'
import { useFullSession } from 'vtex.session-client'

import ConditionLayout from './ConditionLayout'
import type { MatchType, Condition, Handlers, NoUndefinedField } from './types'

type Props = {
  conditions: Array<Condition<ContextValues, HandlerArguments>>
  matchType?: MatchType
  Else?: ComponentType
  Then?: ComponentType
}

type ContextValues = {
  impersonable: boolean
}

type HandlerArguments = {
  impersonable: { value: boolean }
}

const HANDLERS: Handlers<ContextValues, HandlerArguments> = {
  impersonable({ values, args }) {
    return values.impersonable === args?.value
  },
}

const ConditionLayoutTelemarketing: StorefrontFunctionComponent<Props> = ({
  Else,
  Then,
  matchType,
  conditions,
  children,
}) => {
  const { data } = useFullSession()

  const impersonable = Boolean(
    data?.session?.namespaces?.impersonate?.canImpersonate?.value
  )

  const values = useMemo<ContextValues>(() => {
    const bag = {
      impersonable,
    }

    // We use `NoUndefinedField` to remove optionality + undefined values from the type
    return bag as NoUndefinedField<typeof bag>
  }, [impersonable])

  return (
    <ConditionLayout
      Else={Else}
      Then={Then}
      matchType={matchType}
      conditions={conditions}
      values={values}
      handlers={HANDLERS}
    >
      {children}
    </ConditionLayout>
  )
}

export default ConditionLayoutTelemarketing
