import { FC } from 'react'

import { useConditionContext } from './ConditionContext'

const Default: FC = ({ children }) => {
  const { matched } = useConditionContext()
  if (matched !== false) {
    return null
  }

  return children as any
}

export default Default
