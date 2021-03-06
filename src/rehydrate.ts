import * as get from "lodash.get"
import * as set from "lodash.set"
import { IPersistableStore, KeyOrKeys } from "./type"

/**
 * Load the state of `stores` from storage. 
 * Sets the variables in the stores. 
 * When done will trigger using `rehydratedKeys`.
 * @param storage pass localforage or AsyncStorage here
 * @param stores pass your IPersistableStores
 */
const rehydrate = (storage: any, stores: IPersistableStore[]) => {
  return new Promise((resolve) => {
    let callbacksNeeded = stores.length
    const tryResolve = () => {
      callbacksNeeded--
      if (callbacksNeeded === 0) {
        resolve()
      }
    }
    for (const store of stores) {
      storage.getItem(`store.${store.name}`, (err: any, objString: any) => {
        const obj = JSON.parse(objString)
        for (const key of store.getPropKeys()) {
          const oldValue = get(obj, key)
          if (oldValue !== undefined && oldValue !== null) {
            set(store, key, oldValue)
          }
        }
        const untypedStore: any = store
        untypedStore.trigger(store.rehydratedKeys)
        tryResolve()
      })
    }
  })
}

export default rehydrate
