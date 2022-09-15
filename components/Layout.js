import React from 'react'
import Footer from './Footer'
import AppBar from './AppBar'

export default function Layout(props) {
  return (
    <>
        <AppBar/>
            <main>{props.children}</main>
        <Footer/>
    </>
  )
}
