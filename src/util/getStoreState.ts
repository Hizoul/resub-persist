import * as get from "lodash.get"
import * as isArray from "lodash.isarray"
import * as set from "lodash.set"
import { IPersistableStore } from "../type"

/**
 * Get a Snapshot of the current Store State.
 * Useful for testing with jest expect.toMatchSnapshot
 *
 * @param store Store to create State-Snapshot from
 * @param paths (Optional) Only copy these strings (uses lodash.get/set)
 */
const getStoreState = (store: IPersistableStore, paths?: string[]) =>  {
  const objectToMatch = {}
  const pathsToUse = paths !== undefined && isArray(paths) ? paths : store.getPropKeys()
  for (const path of pathsToUse) {
    const val: any = get(store, path)
    set(objectToMatch, path, val)
  }
  return objectToMatch
}

export default getStoreState
