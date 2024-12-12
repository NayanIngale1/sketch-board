"use client";

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image"

export const EmptyBoards = () => {
  const { organization } = useOrganization()
  const create = useMutation(api.boards.create)


  const onClick = () => {
    if (!organization) return;
    create({
      title: "untitled",
      orgId: organization.id
    })
  }
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src='/empty-boards.svg'
        width={110}
        height={110}
        alt="Empty"
      />
      <h2 className="text-2xl font-semibold mt-6">
        Create your first board!
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button
          size="lg"
          onClick={onClick}
          className="cursor-pointer"
        >
          Create a board
        </Button>
      </div>
    </div>
  )
}