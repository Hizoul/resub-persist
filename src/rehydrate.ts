import { get, isNil, set } from "lodash"
import makeObjectFromPropKeys from "./makeObjectFromPropKeys"
import { IPersistableStore, KeyOrKeys } from "./type"

type StoreWithTrigger = IPersistableStore & { trigger: (limit?: KeyOrKeys) => void }

const rehydrate = (storage: any, stores: StoreWithTrigger[]) => {
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
          if (!isNil(oldValue)) {
            set(store, key, oldValue)
          }
        }
        store.trigger()
        tryResolve()
      })
    }
  })
}

export default rehydrate
