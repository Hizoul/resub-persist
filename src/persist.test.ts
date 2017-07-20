import persist from "./persist"
import memForage from "./testUtil/miniMemForage"
import TestStore1 from "./testUtil/testStore"

test("Cover Persist Proeprty Test", () => {
  TestStore1.toggleMyBool()
  TestStore1.setMyString("TestintHISOUT")
  expect(memForage.getData()).toMatchSnapshot("Before Persistence Storage is Empty")
  persist(memForage, [TestStore1])
  expect(memForage.getData()).toMatchSnapshot("After Persistence Storage is contains changes")
})
