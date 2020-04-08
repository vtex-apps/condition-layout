import { useConditionContext } from './ConditionContext'

const Else: StorefrontFunctionComponent = ({ children }) => {
  const { matched } = useConditionContext()
  if (matched !== false) {
    return null
  }

  return children as any
}

Else.schema = {
  title: 'admin/editor.condition-layout.else',
  type: 'string',
}

export default Else
