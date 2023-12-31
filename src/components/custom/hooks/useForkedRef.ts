import {useMemo} from 'react'

export type AssignableRef<ValueType> =
  | {
      bivarianceHack(instance: ValueType | null): void
    }['bivarianceHack']
  | React.MutableRefObject<ValueType | null>

export function useForkedRef<RefValueType = any>(...refs: (AssignableRef<RefValueType> | null | undefined)[]) {
  return useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null
    }
    return (node: any) => {
      refs.forEach(ref => {
        assignRef(ref, node)
      })
    }
  }, refs)
}

export function assignRef<RefValueType = any>(ref: AssignableRef<RefValueType> | null | undefined, value: any) {
  if (ref == null) return
  if (isFunction(ref)) {
    ref(value)
  } else {
    try {
      ref.current = value
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`)
    }
  }
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: any): value is Function {
  return !!(value && {}.toString.call(value) == '[object Function]')
}
