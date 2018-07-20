import persist from "./persist"
import { IPersistableStore, KeyOrKeys } from "./type"

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

/**
 * Subscribe to `store` with the optional `key` param. 
 * Calls `persist` for the store after every `resub` trigger relevant to `key`.
 * @param storage pass localforage or AsyncStorage here
 * @param store pass your IPersistableStore that should be persisted on change
 * @param key define to which `resub`-keys the autosave should react
 */
const autoSave = (storage: any, store: IPersistableStore, key?: KeyOrKeys) => {
  const s: any = store
  return s.subscribe(tryToSaveStore(storage, store), key)
}

export default autoSave
