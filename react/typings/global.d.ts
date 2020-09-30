type NoUndefinedField<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined>
}

type GenericSubject = {
  type: string
}

type GenericSubjects = {
  [T: string]: GenericSubject
}

interface ValueSubject extends GenericSubject {
  type: 'value'
}

interface ArraySubject extends GenericSubject {
  type: 'array'
  id?: string
}

type MatchType = 'any' | 'all' | 'none'

type Condition = ValueCondition | ArrayConditionValueCondition
type Conditions = Condition[]

type ConditionObject = string | number | null | undefined

interface ValueCondition {
  subject: string
  verb: 'is' | 'is-not'
  object: ConditionObject
}

interface ArrayCondition {
  subject: string
  verb: 'contains' | 'does-not-contain'
  object: ConditionObject
}

type Values = {
  [key: string]: string | number | boolean | Array<{ [key: string]: unknown }>
}
