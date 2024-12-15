"use client"

import React, { use } from 'react'
import Canvas from "./_components/canvas"
import Room from "@/components/room";
import { LiveblocksProvider } from "@liveblocks/react";
import Loading from "./_components/loading";



const publicApiKey = "pk_dev_AV8mq8Mq639n96rL0CKTlv7q1QdmkSk5nhCSIFvCCJzt69LgiUp4K1Tz1IxwHHZd";

interface BoardIdPageProps {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {

  const query = use(params)


  return (
    <LiveblocksProvider authEndpoint='/api/liveblocks-auth' >
      <Room roomId={query.boardId as string} fallback={<Loading />}>
        <Canvas boardId={query.boardId as string} />
      </Room>
    </LiveblocksProvider>
  )
}

export default BoardIdPage
