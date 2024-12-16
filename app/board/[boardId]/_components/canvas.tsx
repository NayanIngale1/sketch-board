"use client"

import React, { useState } from 'react'
import { useCanRedo, useCanUndo, useHistory, useSelf } from "@liveblocks/react"
import Info from "./info"
import Participants from "./participants"
import Toolbar from "./toolbar"
import { CanvasMode, CanvasState } from "@/types/canvas"


interface CanvasProps {
  boardId: string;
}


const Canvas = ({ boardId }: CanvasProps) => {

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const info = useSelf((me) => me.info)
  console.log(info, '<---info')
  return (
    <div
      className="w-full h-full relative bg-neutral-100 touch-none"
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </div>
  )
}

export default Canvas
