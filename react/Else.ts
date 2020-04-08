import { useConditionContext } from './ConditionContext'

const Else: StorefrontFunctionComponent = ({ children }) => {
  const { matched } = useConditionContext()

  if (matched !== false) {
    return null
  }

  return children as never
}

Else.schema = {
  title: 'admin/editor.condition-layout.else',
  type: 'object',
  properties: {
    enabled: {
      default: true,
      title: 'admin/editor.condition-layout.enabled',
      type: 'boolean',
    },
  },
}

export default Else
