"use client"


import { shallow, useOthersConnectionIds, useOthersMapped } from "@liveblocks/react"
import { memo } from "react"
import { Cursor } from "./cursor"
import { Path } from "./path"
import { colorToCss } from "@/lib/utils"


const Cursors = () => {
  const ids = useOthersConnectionIds()
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor
          key={connectionId}
          connectionId={connectionId}
        />
      ))}
    </>
  )

}

const Drafts = () => {
  const others = useOthersMapped((other) => ({
    pencilDraft: other.presence.pencilDraft,
    pencolor: other.presence.penColor,
  }), shallow);

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.pencolor ? colorToCss(other.pencolor) : "#000"}
            />
          )
        }
        return null;
      })}
    </>
  )
}

export const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  )
})


CursorsPresence.displayName = "CursorsPresence"