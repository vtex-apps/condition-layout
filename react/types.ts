export type NoUndefinedField<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined>
}

export type MatchType = 'any' | 'all' | 'none'

export type Condition<Subjects = string> = {
  subject: Subjects
  arguments: Record<string, string | number | boolean | null | unknown[]>
}

export type Handler<Values, Args> = (o: {
  values: Values
  args: Args
}) => boolean

export type Handlers<Subjects, Args extends Record<keyof Subjects, unknown>> = {
  [key in keyof Subjects]: Handler<Subjects, Args[key]>
}
