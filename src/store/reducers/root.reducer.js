import { combineReducers } from "redux"
import searchReducer from "./search.reducer"
import siteReducer from "./site.reducer"

export default combineReducers({
  searchReducer,
  siteReducer,
})
