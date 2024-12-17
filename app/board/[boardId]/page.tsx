"use client"

import React, { use } from 'react'
import Canvas from "./_components/canvas"
import { ClientSideSuspense, LiveblocksProvider, RoomProvider, useStatus } from "@liveblocks/react";
import Loading from "./_components/loading";



const publicApiKey = "pk_dev_AV8mq8Mq639n96rL0CKTlv7q1QdmkSk5nhCSIFvCCJzt69LgiUp4K1Tz1IxwHHZd";

interface BoardIdPageProps {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  const { boardId } = use(params);


  return (
    <LiveblocksProvider
      authEndpoint='/api/liveblocks-auth'
      throttle={16}
    >
      <RoomProvider id={boardId as string} initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={<Loading />}>
          <RoomWrapper boardId={boardId as string} />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}

export default BoardIdPage


interface RoomWrapperProps {
  boardId: string;
}

const RoomWrapper = ({ boardId }: RoomWrapperProps) => {
  const status = useStatus();

  if (status === 'connecting') {
    return <Loading />;
  }

  return <Canvas boardId={boardId} />;
};