import { IPersistableStore } from "../type"
import makeObjectFromPropKeys from "./getStoreState"

const matchStoreState = (store: IPersistableStore, msg?: string) => {
  expect(makeObjectFromPropKeys(store)).toMatchSnapshot(msg)
}

export default matchStoreState
