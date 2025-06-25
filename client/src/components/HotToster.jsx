import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function HotToster() {
  return (
    <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerClassName=""
        containerStyle={{ zIndex: 100000, position: "fixed" }}
      />
  )
}
