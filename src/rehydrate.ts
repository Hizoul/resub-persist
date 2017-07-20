import { get, isNil, set } from "lodash"
import makeObjectFromPropKeys from "./makeObjectFromPropKeys"
import { IPersistableStore, KeyOrKeys } from "./type"

const rehydrate = (storage: any, stores: IPersistableStore[]) => {
  console.log("trying to rehydrate")
  return new Promise((resolve) => {
    let callbacksNeeded = stores.length
    const tryResolve = () => {
      callbacksNeeded--
      if (callbacksNeeded === 0) {
        resolve()
      }
    }
    for (const store of stores) {
      console.log("trying to get")
      storage.getItem(`store.${store.name}`, (err: any, objString: any) => {
        console.log("GOTRESULT", objString)
        const obj = JSON.parse(objString)
        for (const key of store.getPropKeys()) {
          const oldValue = get(obj, key)
          if (!isNil(oldValue)) {
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
