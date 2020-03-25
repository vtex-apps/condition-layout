type GenericSubjects = {
  [T: string]: GenericSubject
}

type GenericSubject = {
  type: string
}

interface ValueSubject extends GenericSubject {
  type: 'value'
}

interface ArraySubject extends GenericSubject {
  type: 'array'
  id?: string
}

type Matching = 'any' | 'all' | 'none'

type Conditions<Subjects> = Condition<Subjects, keyof Subjects>[]

type Condition<Subjects = GenericSubjects> =
  | ValueCondition<Subjects>
  | ArrayCondition<Subjects>

type ValueSubjectKeys<Subjects> = FilterKeys<Subjects, ValueSubject>
type ArraySubjectKeys<Subjects> = FilterKeys<Subjects, ArraySubject>

type ConditionObject = string | number | null | undefined

interface ValueCondition<Subjects = null> {
  subject: Subjects extends null
    ? string
    : ValueSubjectKeys<Subjects>
  verb: 'is' | 'is-not'
  object: ConditionObject
}

interface ArrayCondition<Subjects = null> {
  subject: Subjects extends null
    ? string
    : ArraySubjectKeys<Subjects>
  verb: 'contains' | 'does-not-contain'
  object: ConditionObject
}

// TODO: properly type Values (this type is not correct and can be removed)
type Values<Subjects> = {
  [P in keyof Subjects]: Subjects[P] extends ValueSubject
    ? string | number
    : { id: string }[]
}