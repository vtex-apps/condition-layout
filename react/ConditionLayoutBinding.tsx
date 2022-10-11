import React, { useMemo } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { useFullSession } from 'vtex.session-client'

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
  salesChannel: string
}

type HandlerArguments = {
  bindingId: { id: string }
  salesChannel: { id: string[] }
}

const HANDLERS: Handlers<ContextValues, HandlerArguments> = {
  bindingId({ values, args }) {
    return String(values.bindingId) === String(args?.id)
  },
  salesChannel({ values, args }) {
    console.log('salesChannel selected', args.id)

    return args.id.includes(values.salesChannel)
  }
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

  const { data } = useFullSession()
  const salesChannel = data?.session?.namespaces?.store?.channel?.value

  console.log("salesChannel of the session", salesChannel)

  const values = useMemo<ContextValues>(() => {
    const bag = {
      bindingId,
      salesChannel
    }

    // We use `NoUndefinedField` to remove optionality + undefined values from the type
    return bag as NoUndefinedField<typeof bag>
  }, [bindingId, salesChannel])

  if (values.salesChannel == null) {
    return null
  }

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
