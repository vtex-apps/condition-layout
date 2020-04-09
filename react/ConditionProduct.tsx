import React from 'react'

import Condition, { ConditionProps } from './Condition'

const ConditionProduct: StorefrontFunctionComponent<ConditionProps> = ({
  children,
  ...props
}) => {
  return <Condition {...props}>{children}</Condition>
}

ConditionProduct.schema = {
  title: 'admin/editor.condition-layout.condition',
}

export default ConditionProduct
