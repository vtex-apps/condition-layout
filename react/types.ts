export type NoUndefinedField<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined>
}

export type MatchType = 'any' | 'all' | 'none'

export type Handler<Values, Args> = (o: {
  values: Values
  args: Args
}) => boolean

type SameProps<T> = Record<keyof T, unknown>

export type Condition<Subjects = unknown, Args = unknown> = {
  toBe?: boolean
} & (Args extends SameProps<Subjects>
  ? {
      [K in keyof Subjects]: Args[K] extends undefined
        ? { subject: K }
        : { subject: K; arguments: Args[K] }
    }[keyof Subjects]
  : { subject: string; arguments?: unknown })

export type Handlers<Subjects, Args extends SameProps<Subjects>> = {
  [K in keyof Subjects]: Handler<Subjects, Args[K]>
}
