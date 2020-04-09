import React from 'react'

import Condition, { ConditionProps } from './Condition'
import { PRODUCT_SUBJECTS } from './modules/subjects'

const ConditionProduct: StorefrontFunctionComponent<ConditionProps> = ({
  children,
  ...props
}) => {
  return <Condition {...props}>{children}</Condition>
}

ConditionProduct.schema = {
  title: 'admin/editor.condition-layout.condition',
  type: 'object',
  properties: {
    enabled: {
      title: 'admin/editor.condition-layout.enabled.title',
      description: 'admin/editor.condition-layout.enabled.description',
      default: true,
      type: 'boolean',
    },
  },
  dependencies: {
    enabled: {
      oneOf: [
        {
          properties: {
            enabled: {
              enum: [true],
            },
            match: {
              default: 'all',
              enum: ['any', 'none', 'all'],
              title: 'admin/editor.condition-layout.match',
              type: 'string',
            },
            conditions: {
              title: 'admin/editor.condition-layout.conditions',
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  subject: {
                    default: '',
                    type: 'string',
                    title: 'admin/editor.condition-layout.subject',
                    enum: Object.keys(PRODUCT_SUBJECTS),
                  },
                  verb: {
                    type: 'string',
                    title: 'admin/editor.condition-layout.verb',
                  },
                  object: {
                    type: 'string',
                    title: 'admin/editor.condition-layout.object',
                  },
                },
                dependencies: {
                  subject: {
                    oneOf: [
                      {
                        properties: {
                          subject: {
                            enum: Object.entries(PRODUCT_SUBJECTS)
                              .filter(([, { type }]) => type === 'array')
                              .map(([key]) => key),
                          },
                          verb: {
                            default: 'contains',
                            enum: ['contains', 'does-not-contain'],
                          },
                        },
                      },
                      {
                        properties: {
                          subject: {
                            enum: Object.entries(PRODUCT_SUBJECTS)
                              .filter(([, { type }]) => type === 'value')
                              .map(([key]) => key),
                          },
                          verb: {
                            default: 'is',
                            enum: ['is', 'is-not'],
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      ],
    },
  },
}

export default ConditionProduct
