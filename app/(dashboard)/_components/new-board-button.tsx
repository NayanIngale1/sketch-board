"use client"

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from 'react'
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled: boolean;
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create)
  const router = useRouter()

  const onClick = () => {
    mutate({
      orgId: orgId,
      title: "untitled"
    }).then((id) => {
      toast.success("New board has been created")
      router.push(`/board/${id}`)

    }).catch(() => toast.error("Failed to create board"));
  }

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn("col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (pending || disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-white text-sm font-light">New board</p>
    </button>
  )
}

export default NewBoardButton
