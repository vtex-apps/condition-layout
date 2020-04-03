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

type Matching = 'any' | 'all' | 'none'

type Condition<Subjects = GenericSubjects> =
  | ValueCondition<Subjects>
  | ArrayCondition<Subjects>

type Conditions<Subjects> = Array<Condition<Subjects>>

type ValueSubjectKeys<Subjects> = FilterKeys<Subjects, ValueSubject>
type ArraySubjectKeys<Subjects> = FilterKeys<Subjects, ArraySubject>

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

type Values<T> = {
  [P in keyof T]: string | number | Array<{ [key: string]: unknown }>
}

type ConditionContextValue = {
  subjects: GenericSubjects
  values: Values<GenericSubjects>
}
