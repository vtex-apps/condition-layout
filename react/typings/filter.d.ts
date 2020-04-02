/** ### How this works:
 * Take this example:
 *
 * ```
 *   type Subjects = {
 *     a: { type: 1 }
 *     b: { type: 1 }
 *     c: { type: 2 }
 *     d: { type: 2 }
 *   }
 *
 *   type Filter = { type: 1 }
 * ```
 *
 * `FlagValues<Subjects, Filter>` returns a type with the keys of
 * `Subjects`, whose values, if they extend the type of `Filter`,
 * is the key itself, or `never`.
 * For example:
 *
 * ```
 *   {
 *     a: 'a',
 *     b: 'b',
 *     c: never,
 *     d: never,
 *   }
 * ```
 *
 * `FilterKeys<Subjects>`, in turn, returns an union
 * from the values of this result, picking them using `keyof`.
 * So, the result would be `'a' | 'b' | never | never`.
 * However, `never` values are excluded automatically from the
 * union, resulting in only `'a' | 'b'`
 */

/** Flags values of `T` that don't extend `Filter` with `never`,
 * otherwise sets the value as its key
 */
type FlagValues<T, Filter> = {
  [Key in keyof T]: T[Key] extends Filter ? Key : never
}

/** Filters keys of `T` whose value doesn't extend `Filter`,
 * returning a union of filtered-out keys.
 */
type FilterKeys<T, Filter> = FlagValues<T, Filter>[keyof FlagValues<T, Filter>]
