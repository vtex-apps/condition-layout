import React, { useMemo } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import type { ComponentType } from 'react'

import ConditionLayout from './ConditionLayout'
import type { NoUndefinedField, MatchType, Condition, Handlers } from './types'

type Props = {
  conditions: Array<Condition<ContextValues, HandlerArguments>>
  matchType?: MatchType
  Else?: ComponentType
  Then?: ComponentType
}

type ContextValues = {
  bindingId: string
}

type HandlerArguments = {
  bindingId: { id: string }
}

const HANDLERS: Handlers<ContextValues, HandlerArguments> = {
  bindingId({ values, args }) {
    return String(values.bindingId) === String(args?.id)
  },
}

const ConditionLayoutBinding: StorefrontFunctionComponent<Props> = ({
  Else,
  Then,
  matchType,
  conditions,
  children,
}) => {
  const {
    binding: { id: bindingId },
  } = useRuntime()

  const values = useMemo<ContextValues>(() => {
    const bag = {
      bindingId,
    }

    // We use `NoUndefinedField` to remove optionality + undefined values from the type
    return bag as NoUndefinedField<typeof bag>
  }, [bindingId])

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

export default ConditionLayoutBinding
