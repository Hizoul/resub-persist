export type KeyOrKeys = string | number | string[] | number[]

/**
 * Interface to allow Persisting and Restoring
 *
 * @export
 * @interface IPersistableStore
 */
export interface IPersistableStore {
  /**
   * The name is used for getItem/setItem as `store.${name}`
   *
   * @type {string}
   * @memberof IPersistableStore
   */
  name: string
  /**
   * All keys returned here will be automatically persisted / rehydrated
   * They will also be snapshotted by the optional matchState testing utiltilty
   *
   * @memberof IPersistableStore
   */
  getPropKeys: () => string[]
  /**
   * After rehydration, resub-persist calls StoreBase.trigger
   * This means you can limit triggers on a Store after a rehydration
   *
   * @type {KeyOrKeys}
   * @memberof IPersistableStore
   */
  keyOrKeys?: KeyOrKeys
}
