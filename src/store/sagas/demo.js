import { takeEvery, put } from "redux-saga/effects"

function* demo_async() {
  yield put({ type: "demo" })
}

export default function* demoSaga() {
  yield takeEvery("demo_async", demo_async)
}
