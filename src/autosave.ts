import * as get from "lodash.get"
import * as set from "lodash.set"
import persist from "./persist"
import { IPersistableStore, KeyOrKeys } from "./type"
import getStoreState from "./util/getStoreState"

const alreadySaving: {[index: string]: boolean | undefined} = {}

const redoSearch: {[index: string]: boolean | undefined} = {}

const tryToSaveStore = (storage: any, store: IPersistableStore)  => {
  const doSave = async () => {
    if (alreadySaving[store.name]) {
      redoSearch[store.name] = true
      return
    }
    alreadySaving[store.name] = true
    await persist(storage, [store])
    alreadySaving[store.name] = false
    if (redoSearch[store.name]) {
      redoSearch[store.name] = false
      doSave()
    }
  }
  return doSave
}

const autoSave = (storage: any, store: IPersistableStore, key?: KeyOrKeys) => {
  const s: any = store
  return s.subscribe(tryToSaveStore(storage, store), key)
}

export default autoSave
