"use client"

import React, { use, useEffect } from 'react'
import Canvas from "./_components/canvas"
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
  useStatus
} from "@liveblocks/react";
import Loading from "./_components/loading";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



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
      <RoomProvider
        id={boardId as string}
        initialPresence={{ cursor: null, selection: [], pencilDraft: null, penColor: null }}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList<string>([]),
        }}>
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
  const router = useRouter();

  useEffect(() => {
    if (status === 'connecting') {
      toast.dismiss();
      toast.loading("Connecting to the board.");
    } else if (status === "connected") {
      toast.dismiss();
      toast.success("Connected to the board.");
    } else if (status === "disconnected") {
      toast.dismiss();
      toast.error("You are allowed to access this board.");
      router.back();
    } else if (status === "reconnecting") {
      toast.dismiss();
      toast.info("Reconnecting to the board.")
    }
  }, [status, router])

  if (status === 'connecting') {
    return <Loading />;
  }

  return <Canvas boardId={boardId} />;
};