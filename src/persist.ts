import * as get from "lodash.get"
import * as set from "lodash.set"
import makeObjectFromPropKeys from "./makeObjectFromPropKeys"
import { IPersistableStore } from "./type"

const persist = (storage: any, stores: IPersistableStore[]) => {
  return new Promise((resolve) => {
    for (const store of stores) {
      storage.setItem(`store.${store.name}`, JSON.stringify(makeObjectFromPropKeys(store)))
    }
    resolve()
  })
}

export default persist
