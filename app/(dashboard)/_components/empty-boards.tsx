"use client";

import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image"
import { useRouter } from "next/navigation";

export const EmptyBoards = () => {
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.board.create)
  const router = useRouter()


  const onClick = () => {
    if (!organization) return;
    mutate({
      title: "untitled",
      orgId: organization.id
    }).then((id) => {
      toast.success(`Board created successfully ${id}`)
      router.push(`/board/${id}`)
    }).catch(() => { toast.error("Failed to create board") });;
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
          disabled={pending}
          onClick={onClick}
          className="cursor-pointer"
        >
          Create a board
        </Button>
      </div>
    </div>
  )
}