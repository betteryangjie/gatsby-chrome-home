import React, { useState, useRef, useEffect } from "react"
import useInput from "../../hooks/useInput"
import { BsSearch, BsClock, BsX } from "react-icons/bs"
import * as styles from "./index.module.less"
import { useDispatch, useSelector } from "react-redux"

function toSearch(searchInputValue) {
  const url = `https://www.google.com.hk/search?q=${searchInputValue}`
  window.open(url, "_blank")
  // window.location = url
}

export default function Search() {
  const textInput = useRef(null)
  const searchInput = useInput("")
  const [isFocus, setFocus] = useState(false)
  const dispatch = useDispatch()
  const { searchHistory } = useSelector(state => state.searchReducer)
  function handleSubmit(e) {
    e.preventDefault()
    const searchInputValue = searchInput.input.value
    toSearch(searchInputValue)
    dispatch({
      type: "addSearch",
      payload: searchInputValue,
    })
  }
  useEffect(() => {
    const fn = function (e) {
      setFocus(false)
    }
    document.addEventListener("click", fn)
    return () => {
      document.removeEventListener("click", fn)
    }
  }, [])
  const isShowHistory = isFocus && (searchHistory || []).length > 0
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset
          className={`${styles.form_group} ${
            isShowHistory ? styles.form_group_focus : ""
          }`}
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <div className={styles.input_wrapper}>
            <BsSearch className={styles.search_icon} />
            <input
              ref={textInput}
              className={styles.form_control}
              type="text"
              placeholder="在 Google 上搜索，或者输入一个网址"
              onFocus={() => {
                setFocus(true)
              }}
              {...searchInput.input}
            />
          </div>
          {isShowHistory && (
            <ul className={styles.history_list}>
              {searchHistory.map(historyItem => (
                <li
                  key={historyItem}
                  className={styles.history_item}
                  onClick={() => {
                    toSearch(historyItem)
                  }}
                >
                  <BsClock className={styles.clock_icon} />
                  <span className={styles.history_item_text}>
                    {historyItem}
                  </span>
                  <BsX
                    className={styles.del_icon}
                    onClick={e => {
                      e.stopPropagation()
                      dispatch({
                        type: "removeSearch",
                        payload: historyItem,
                      })
                      textInput.current.focus()
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </fieldset>
      </form>
    </div>
  )
}
