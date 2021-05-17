import React from "react"
import GoogleLogo from "../images/googlelogo_color_272x92dp.png"

export default function Header() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
    >
      <img
        // src="https://www.google.com.hk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        src={GoogleLogo}
        style={{ maxHeight: "92px" }}
      />
    </div>
  )
}
