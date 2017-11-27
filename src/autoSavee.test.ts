import autoSave from "./autoSave"
import memForage from "./testUtil/miniMemForage"
import TestStore1 from "./testUtil/testStore"

const waitFor = (milli: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milli)
  })
}


test("Cover Persist Proeprty Test", async () => {
  expect(memForage.getData()).toMatchSnapshot("empty before any actions")
  TestStore1.toggleMyBool()
  TestStore1.setMyString("dont save me yet")
  await waitFor(50)
  expect(memForage.getData())
  .toMatchSnapshot("nothing automatically persisted")
  const sub = autoSave(memForage, TestStore1)
  TestStore1.toggleMyBool()
  TestStore1.setMyString("i was autosaved")
  await waitFor(50)
  const data = memForage.getData()
  expect(memForage.getData())
  .toMatchSnapshot("automatic persistence worked")
  TestStore1.unsubscribe(sub)
  TestStore1.toggleMyBool()
  TestStore1.setMyString("i shouldn't be saved")
  await waitFor(50)
  expect(memForage.getData())
  .toMatchSnapshot("disabling automatic saving results in no changes made")
  expect(JSON.stringify(data) === JSON.stringify(memForage.getData())).toBeTruthy()
  const sub2 = autoSave(memForage, TestStore1)
  TestStore1.toggleMyBool()
  TestStore1.setMyString("autochangesaved again")
  await waitFor(50)
  expect(memForage.getData())
  .toMatchSnapshot("resubbing autosaves again")
  TestStore1.toggleMyBool()
  await waitFor(200)
  expect(memForage.getData())
  .toMatchSnapshot("boolean can become true")
})
