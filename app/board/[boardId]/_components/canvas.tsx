"use client"

import React from 'react'
import { useSelf } from "@liveblocks/react"
import Info from "./info"
import Participants from "./participants"
import Toolbar from "./toolbar"


interface CanvasProps {
  boardId: string;
}


const Canvas = ({ boardId }: CanvasProps) => {


  const info = useSelf((me) => me.info)
  console.log(info, '<---info')
  return (
    <div
      className="w-full h-full relative bg-neutral-100 touch-none"
    >
      <Info />
      <Participants />
      <Toolbar />
    </div>
  )
}

export default Canvas
