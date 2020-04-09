export function getConditionItemSchema({ subjects }: any = {}) {
  return {
    subject: {
      type: 'string',
      ...(subjects && { enum: subjects }),
      title: 'admin/editor.condition-layout.subject',
    },
    verb: {
      default: 'is',
      type: 'string',
      title: 'admin/editor.condition-layout.verb',
      enum: ['is', 'is-not', 'contains', 'does-not-contain'],
    },
    object: {
      type: 'string',
      title: 'admin/editor.condition-layout.object',
    },
  }
}
