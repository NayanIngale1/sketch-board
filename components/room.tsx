"use client"

import { ReactNode } from "react"
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react"


import React from 'react'


interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null
}


export const Room = ({
  children,
  roomId,
  fallback
}: RoomProps) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>

  )
}

export default Room