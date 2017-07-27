# resub-persist [![Build Status](https://travis-ci.org/Hizoul/resub-persist.svg?branch=master)](https://travis-ci.org/Hizoul/resub-persist) [![Coverage Status](https://coveralls.io/repos/github/Hizoul/resub-persist/badge.svg?branch=master)](https://coveralls.io/github/Hizoul/resub-persist?branch=master)

Dead simple peristence for Resub-Stores.

## Getting Started

In order to make your store persistable simply implement the `IPersistableStore` interface.
This means define a `name` and `getPropKeys` in your ResubStore and you're good to go!

```ts
@AutoSubscribeStore
class TestStore extends StoreBase implements IPersistableStore {
  public name = "detailList"
  private myBool: boolean
  private myString: string
  ...
  public getPropKeys() { return ["myBool", "myString"] }
  ...
}
```

## Persist and Rehydrate

Persistence and Rehydration are simple one line calls thanks to the `IPersistableStore` Interface!
You only need to a localstorage Compatible API (web = `localStorage`/`localforage`, rn = `AsyncStorage`) as first argument.
They both return a promise to tell you when they are done.

```ts
  const TestStore1 = new TestStore()
  const TestStore2 = new TestStore()
  const persistAndRehydrate = async () => {
    await persist(memForage, [TestStore1])
    await rehydrate(memforage, [TestStore2]) // TestStore2 now has persisted state of TestStore1
  }
  persistAndRehydrate()
```

## Motivation

I was missing an equivalent of `redux-persist` for `resub` so this is something that accomplishes the most basic part of `redux-persist`. Saving parts of a store to a localStorage-compatible API and rehydrating from there to Store.
