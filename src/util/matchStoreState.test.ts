import persist from "../persist"
import memForage from "../testUtil/miniMemForage"
import TestStore1 from "../testUtil/testStore"
import matchStoreState from "./matchStoreState"

test("Cover Persist Proeprty Test", () => {
  matchStoreState(TestStore1, "Initial State")
  TestStore1.toggleMyBool()
  TestStore1.setMyString("asdf")
  matchStoreState(TestStore1, "After Changes")
})
