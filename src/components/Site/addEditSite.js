import React, { useState, useRef, useEffect } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import "./addEditSite.less"

function MyInputField({ formik, label, name, ...props }) {
  return (
    <div className={`input_item ${formik.errors[name] ? "error" : ""}`}>
      <label>{label}</label>
      <input
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        {...props}
      />
      <p>{formik.errors[name] ? formik.errors[name] : null}</p>
    </div>
  )
}

export default function AddEditSite({
  isShow,
  siteItem,
  siteList,
  onClose,
  onFinish,
}) {
  const isAdding = siteItem === undefined || siteItem === null
  const [isDisabledFinishBtn, setDisabledFinishBtn] = useState(
    !(siteItem?.url.length > 0)
  )
  const formik = useFormik({
    initialValues: { siteName: siteItem?.name, siteUrl: siteItem?.url },
    validate: values => {
      const { siteUrl } = values
      const errors = {}
      if (siteUrl === undefined || String(siteUrl).trim().length <= 0) {
        setDisabledFinishBtn(true)
      } else if (
        (siteList || []).filter((_siteItem, _index) =>
          isAdding
            ? _siteItem.url === siteUrl
            : _siteItem.url === siteUrl && siteItem.index !== _index
        ).length > 0
      ) {
        errors.siteUrl = "快捷方式已存在"
        setDisabledFinishBtn(true)
      } else {
        setDisabledFinishBtn(false)
      }
      return errors
    },
    onSubmit: values => {
      const siteObj = {}
      const { siteName, siteUrl } = values
      if (siteName === undefined || String(siteName).trim().length <= 0) {
        siteObj.name = values.siteUrl
      } else {
        siteObj.name = siteName
      }
      siteObj.url = siteUrl
      console.log("==values", values, "==siteObj", siteObj)
      onFinish(siteObj, siteItem?.index)
    },
  })
  return (
    <Modal isOpen={isShow} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={formik.handleSubmit} className="add_edit_site">
          <ModalHeader fontSize={15} color="rgb(32, 33, 36)">
            添加快捷方式
          </ModalHeader>
          <ModalBody>
            <MyInputField
              formik={formik}
              label="名称"
              type="text"
              name="siteName"
            />
            <MyInputField
              formik={formik}
              label="网址"
              type="text"
              name="siteUrl"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="rgb(26, 115, 232)"
              size="sm"
              mr={3}
              px={18}
              variant="outline"
              onClick={onClose}
            >
              取消
            </Button>
            <Button
              type="submit"
              size="sm"
              px={18}
              bgColor="rgb(26, 115, 232)"
              color="#fff"
              variant="solid"
              isDisabled={isDisabledFinishBtn}
            >
              完成
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
