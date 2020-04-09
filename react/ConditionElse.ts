import { useConditionContext } from './ConditionContext'

interface Props {
  enabled?: boolean
}

const Else: StorefrontFunctionComponent<Props> = ({
  children,
  enabled = true,
}) => {
  const { matched } = useConditionContext()

  if (matched !== false || !enabled) {
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
      title: 'admin/editor.condition-layout.enabled.title',
      type: 'boolean',
    },
  },
}

export default Else
