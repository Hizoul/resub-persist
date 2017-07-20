const items = {}

const localforagelikeStore = {
  setItem: (item, value, cb?) => {
    return new Promise((resolve, reject) => {
      items[item] = value
      if (typeof(cb) === "function") {
        cb(null, value)
      }
      resolve(value)
    })
  },
  getItem: (item, cb?) => {
    return new Promise((resolve, reject) => {
      if (typeof(cb) === "function") {
        cb(null, items[item])
      }
      resolve(items[item])
    })
  },
  getData: () => items
}

export default localforagelikeStore
