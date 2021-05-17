import CommonUtil from "../../util/Common"

const LS_KEY = "SITE_LIST"
const MAX_SIZE = 8

const initialState = {
  siteList: CommonUtil.getObjFromLocalstorage(LS_KEY) || [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "addSite": {
      const siteList = [...state.siteList]
      siteList.push(action.payload.site)
      if (siteList.length >= MAX_SIZE) {
        siteList.splice(MAX_SIZE)
      }
      CommonUtil.saveObjToLocalstorage(LS_KEY, siteList)
      return {
        siteList,
      }
    }
    case "editSite": {
      const siteList = [...state.siteList]
      siteList[action.payload.index] = action.payload.site
      CommonUtil.saveObjToLocalstorage(LS_KEY, siteList)
      return {
        siteList,
      }
    }
    case "removeSite": {
      const siteList = [...state.siteList]
      siteList.splice(action.payload.index, 1)
      CommonUtil.saveObjToLocalstorage(LS_KEY, siteList)
      return {
        siteList,
      }
    }
    default: {
      return state
    }
  }
}
