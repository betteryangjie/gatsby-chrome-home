export default {
  saveObjToLocalstorage: (keyStr, valueObj) => {
    // window.localStorage.setItem(keyStr, JSON.stringify(valueObj))
  },
  getObjFromLocalstorage: keyStr => {
    // const valueStr = window.localStorage.getItem(keyStr)
    // return JSON.parse(valueStr)
    return undefined
  },
  randNum: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  },
}
