import React, { useState, useRef, useEffect } from "react"
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs"
import "./index.less"
import { useDispatch, useSelector } from "react-redux"
import AddEditSite from "./addEditSite"
import CommonUtil from "../../util/Common"

function SiteIcon({ siteItem }) {
  const { url, randColor } = siteItem
  const [isImgError, setImgError] = useState(false)
  return (
    <div
      className="site_icon"
      style={{
        backgroundColor: isImgError ? randColor : "transparent",
      }}
    >
      {isImgError ? (
        <span>
          {String(url)
            .replace(/[a-zA-Z]{0,}:\/\//, "")
            .replace(/[wW]{3}[.]{1}/, "")
            .substr(0, 1)
            .toUpperCase()}
        </span>
      ) : (
        <img
          src={`${url}/favicon.ico`}
          onError={() => {
            setImgError(true)
          }}
        />
      )}
    </div>
  )
}

function SiteItem({ site, index, setModal, setSiteItem }) {
  const dispatch = useDispatch()
  const [isShowTreeDotsPopover, setTreeDotsPopover] = useState(false)
  useEffect(() => {
    const fn = function (e) {
      setTreeDotsPopover(false)
    }
    document.addEventListener("click", fn)
    return () => {
      document.removeEventListener("click", fn)
    }
  }, [])
  return (
    <div
      className="site_item"
      key={site.url}
      onClick={() => {
        window.open(site.url, "_blank")
      }}
    >
      <div className="site_item_img">
        <SiteIcon siteItem={site} />
      </div>
      <div className="site_item_name">{site.name}</div>
      <BsThreeDotsVertical
        className="site_item_tree_dots"
        onClick={e => {
          e.stopPropagation()
          setTreeDotsPopover(true)
        }}
      />
      {isShowTreeDotsPopover && <div className="site_item_tree_dots_popover_overlay" />}
      {isShowTreeDotsPopover && (
        <div
          className="site_item_tree_dots_popover"
          style={{ display: isShowTreeDotsPopover ? "block" : "none" }}
        >
          <div
            onClick={e => {
              e.stopPropagation()
              setModal(true)
              setSiteItem(Object.assign(site, { index }))
              setTreeDotsPopover(false)
            }}
          >
            修改快捷方式
          </div>
          <div
            onClick={e => {
              e.stopPropagation()
              dispatch({
                type: "removeSite",
                payload: { index },
              })
              setTreeDotsPopover(false)
            }}
          >
            移除
          </div>
        </div>
      )}
    </div>
  )
}

export default function Site() {
  const dispatch = useDispatch()
  const [isShowModal, setModal] = useState(false)
  const [siteItem, setSiteItem] = useState(null)
  const { siteList } = useSelector(state => state.siteReducer)
  function onClose() {
    setModal(false)
    setSiteItem(null)
  }
  function onFinish(siteObj, index) {
    const isAdding = index === undefined
    if (isAdding) {
      Object.assign(siteObj, {
        randColor: `hsl(${CommonUtil.randNum(0, 360)},50%,50%)`,
      })
    }
    dispatch({
      type: isAdding ? "addSite" : "editSite",
      payload: {
        index,
        site: siteObj,
      },
    })
    setModal(false)
    setSiteItem(null)
  }
  return (
    <div className="site">
      {(siteList || []).map((site, index) => (
        <SiteItem
          site={site}
          index={index}
          setModal={setModal}
          setSiteItem={setSiteItem}
        />
      ))}
      {(siteList || []).length < 8 && (
        <div
          className="site_item"
          onClick={() => {
            setModal(true)
            setSiteItem(null)
          }}
        >
          <div className="site_item_img">
            <BsPlus className="add_icon" />
          </div>
          <div className="site_item_name">添加快捷方式</div>
        </div>
      )}
      {isShowModal && (
        <AddEditSite
          isShow={isShowModal}
          siteItem={siteItem}
          siteList={siteList}
          onClose={onClose}
          onFinish={onFinish}
        />
      )}
    </div>
  )
}
