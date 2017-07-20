import * as get from "lodash.get"
import * as isArray from "lodash.isarray"
import * as set from "lodash.set"
import makeObjectFromPropKeys from "./makeObjectFromPropKeys"
import { IPersistableStore } from "./type"

const persist = (storage: any, stores: IPersistableStore[]) => {
  return new Promise((resolve) => {
    let neededCallbacks = isArray(stores) ? stores.length : 0
    const callb = () => {
      neededCallbacks--
      if (neededCallbacks === 0) {
        resolve()
      }
    }
    for (const store of stores) {
      storage.setItem(`store.${store.name}`, JSON.stringify(makeObjectFromPropKeys(store)), callb)
    }
  })
}

export default persist
