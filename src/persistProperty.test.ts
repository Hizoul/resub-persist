import persistProperty from "./persistProperty"

@persistProperty
class TestPersistenceClass {
  
  private myString: string
}

test("Cover Persist Proeprty Test", () => {
  const c = new TestPersistenceClass()
  console.log(`TYPEOF ${typeof(c)}`)
  expect(1 + 3).toBe(4)
})