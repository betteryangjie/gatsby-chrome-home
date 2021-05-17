import React from "react"
import Header from "../components/Header"
import Search from "../components/Search"
import Site from "../components/Site"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({})

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Search />
      <Site />
    </ChakraProvider>
  )
}
