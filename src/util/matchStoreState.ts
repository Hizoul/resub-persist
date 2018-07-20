import { IPersistableStore } from "../type"
import makeObjectFromPropKeys from "./getStoreState"

/**
 * Shortcut for matching a store state against a snapshot in jest
 * @param store Store to snapshot
 * @param msg Name of the snapshot
 */
const matchStoreState = (store: IPersistableStore, msg?: string) => {
  expect(makeObjectFromPropKeys(store)).toMatchSnapshot(msg)
}

export default matchStoreState
