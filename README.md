# resub-persist [![Build Status](https://travis-ci.org/Hizoul/resub-persist.svg?branch=master)](https://travis-ci.org/Hizoul/resub-persist) [![Coverage Status](https://coveralls.io/repos/github/Hizoul/resub-persist/badge.svg?branch=master)](https://coveralls.io/github/Hizoul/resub-persist?branch=master) [![dependencies](https://david-dm.org/Hizoul/resub-persist.png)](https://david-dm.org/Hizoul/resub-persist) [![npm](https://img.shields.io/npm/v/resub-persist.svg)](https://www.npmjs.com/package/resub-persist)

Dead simple peristence for Resub-Stores.

## Getting Started

In order to make your store persistable simply implement the `IPersistableStore` -Interface.
This means define a `name` and `getPropKeys` in your resub-store and you're good to go!

```ts
import { AutoSubscribeStore, autoSubscribeWithKey, StoreBase } from "resub"
import { IPersistableStore } from "resub-persist"

@AutoSubscribeStore
class TestStore extends StoreBase implements IPersistableStore {
  public name = "myTestStore"
  private myBool: boolean
  private myString: string
  public getPropKeys() { return ["myBool", "myString"] }
  ...
}
```

## Persist and Rehydrate

Persistence and rehydration are simple one line calls thanks to the `IPersistableStore`-Interface!
You only need a localstorage compatible API (e.g. web = `localforage`, rn = `AsyncStorage`) as first argument.
They both return a promise to tell you when they are done.

```ts
  import { persist, rehydrate } from "resub-persist"
  const TestStore1 = new TestStore()
  const TestStore2 = new TestStore()
  const persistAndRehydrate = async () => {
    await persist(memForage, [TestStore1])
    await rehydrate(memforage, [TestStore2]) // TestStore2 now has persisted state of TestStore1
  }
  persistAndRehydrate()
```
## Auto-Save on Changes

By using the `autoSave` function you can let the persist function get called automatically!
Thanks to it using resub's classic subscription function under the hood you can, if needed, specify for which keys the autosave should be executed.
The function returns the subscription-id with which you can manually unsubscribe from the store itself, and hence stop the autoSaving.

```ts
  import { autoSave } from "resub-persist"
  const TestStore1 = new TestStore()
  const subId = autoSave(memForage, TestStore1, "mySubscriptionKey")
  // autosave enabled
  TestStore1.unsubscribe(subId)
  // autosave disabled again
```

## Motivation

I was missing an equivalent of `redux-persist` for `resub` so this is something that accomplishes the most basic part of `redux-persist`. Saving parts of a store to a localStorage-compatible API and rehydrating from there to store.

# Changelog
## 1.2.1
- Fix lowercase typo in filename import
## 1.2.0
- Added the autoSave function