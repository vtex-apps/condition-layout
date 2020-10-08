export type NoUndefinedField<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined>
}

export type MatchType = 'any' | 'all' | 'none'

export type Condition = {
  subject: string
  arguments: Record<string, string | number | boolean | null | unknown[]>
}
