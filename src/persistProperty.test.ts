import persistProperty from "./persistProperty"

test("Cover Persist Proeprty Test", () => {
  expect(persistProperty(1, 3)).toBe(4)
})