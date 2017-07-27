import * as get from "lodash.get"
import * as set from "lodash.set"
import { IPersistableStore } from "./type"
import getStoreState from "./util/getStoreState"

const persist = (storage: any, stores: IPersistableStore[]) => {
  return new Promise((resolve) => {
    let neededCallbacks = Array.isArray(stores) ? stores.length : 0
    const callb = () => {
      neededCallbacks--
      if (neededCallbacks === 0) {
        resolve()
      }
    }
    for (const store of stores) {
      storage.setItem(`store.${store.name}`, JSON.stringify(getStoreState(store)), callb)
    }
  })
}

export default persist
