import * as get from "lodash.get"
import * as isArray from "lodash.isarray"
import * as set from "lodash.set"
import { IPersistableStore } from "./type"

const makeObjectFromPropKeys = (store: IPersistableStore, paths?: string[]) =>  {
  const objectToMatch = {}
  const pathsToUse = paths !== undefined && isArray(paths) ? paths : store.getPropKeys()
  for (const path of pathsToUse) {
    const val: any = get(store, path)
    set(objectToMatch, path, val)
  }
  return objectToMatch
}

export default makeObjectFromPropKeys
