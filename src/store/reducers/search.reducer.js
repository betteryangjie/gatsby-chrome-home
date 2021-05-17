import CommonUtil from "../../util/Common"

const LS_KEY = "SEARCH_HISTORY"
const MAX_SIZE = 4

const initialState = {
  searchHistory: CommonUtil.getObjFromLocalstorage(LS_KEY) || [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "addSearch": {
      const searchHistory = [...state.searchHistory]
      const existIndex = searchHistory.indexOf(action.payload)
      if (existIndex >= 0) {
        searchHistory.splice(existIndex, 1)
      }
      searchHistory.unshift(action.payload)
      if (searchHistory.length >= MAX_SIZE) {
        searchHistory.splice(MAX_SIZE)
      }
      CommonUtil.saveObjToLocalstorage(LS_KEY, searchHistory)
      return {
        searchHistory,
      }
    }
    case "removeSearch": {
      const searchHistory = [...state.searchHistory]
      const existIndex = searchHistory.indexOf(String(action.payload))
      if (existIndex >= 0) {
        searchHistory.splice(existIndex, 1)
      }
      CommonUtil.saveObjToLocalstorage(LS_KEY, searchHistory)
      return {
        searchHistory,
      }
    }
    default: {
      return state
    }
  }
}
