import persist from "./persist"
import rehydrate from "./rehydrate"
import memForage from "./testUtil/miniMemForage"
import TestStore, { TestStore1 } from "./testUtil/testStore"

test("Cover Persist Proeprty Test", (done) => {
  const secondaryStore: any = new TestStore1()
  TestStore.toggleMyBool()
  TestStore.setMyString("mychangedString")
  expect(memForage.getData()).toMatchSnapshot("Before Persistence Storage is Empty")
  persist(memForage, [TestStore])
  expect(memForage.getData()).toMatchSnapshot("After Persistence Storage is contains changes")
  expect(TestStore.isMyBool()).not.toBe(secondaryStore.isMyBool())
  expect(TestStore.isMyString()).not.toBe(secondaryStore.isMyString())
  rehydrate(memForage, [secondaryStore]).then(() => {
    expect(TestStore.isMyBool()).toBe(secondaryStore.isMyBool())
    expect(TestStore.isMyString()).toBe(secondaryStore.isMyString())
    done()
  })
})
