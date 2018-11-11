import { IPersistableStore } from "./type"
import getStoreState from "./util/getStoreState"

/**
 * Save the state of `stores` into `storage`.
 * Sets the variables in the stores.
 * When done will trigger using `rehydratedKeys`.
 * @param storage pass localforage or AsyncStorage here
 * @param stores pass your IPersistableStores
 */
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
