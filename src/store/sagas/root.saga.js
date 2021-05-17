import { all } from "redux-saga/effects"
import demoSaga from "./demo"

export default function* rootSaga() {
  yield all([demoSaga()])
}