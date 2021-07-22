import React, { useMemo } from 'react'
import type { ComponentType } from 'react'
import { useRuntime } from 'vtex.render-runtime'

import ConditionLayout from './ConditionLayout'
import type { NoUndefinedField, MatchType, Condition, Handlers } from './types'

type Props = {
  conditions: Array<Condition<ContextValues, HandlerArguments>>
  matchType?: MatchType
  Else?: ComponentType
  Then?: ComponentType
}

type ContextValues = {
  id: string,
  type: 'category' | 'department'
}

type HandlerArguments = {
  categoryId: { ids: string[] }
  departmentId: { ids: string[] }
}

const HANDLERS: Handlers<ContextValues, HandlerArguments> = {
  categoryId({ values, args }) {
    if(values.type === 'category') {

      return args.ids.includes(values.id)
    }

    return false; 
  },
  departmentId({ values, args }) {
    if(values.type === 'department') {
      
      return args.ids.includes(values.id)
    }

    return false;
  },
}

const ConditionLayoutCategory: StorefrontFunctionComponent<Props> = ({
  Else,
  Then,
  matchType,
  conditions,
  children,
}) => {
  const { 
    route: { pageContext: { id, type} },
  } = useRuntime()

  const values = useMemo<ContextValues>(() => {
    const bag = {
      id, type
    }

    // We use `NoUndefinedField` to remove optionality + undefined values from the type
    return bag as NoUndefinedField<typeof bag>
  }, [id, type])

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

export default ConditionLayoutCategory