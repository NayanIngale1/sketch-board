import { Actions } from "@/components/actions"
import { Hint } from "@/components/hint"
import RenameModal from "@/components/rename-modal"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useQuery } from "convex/react"
import { Menu } from "lucide-react"
import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import React from 'react'


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})


interface InfoProps {
  boardId: string
}


const TabSeparator = () => {
  return (
    <div className="text-neutral-400 px-1.5">
      |
    </div>
  )
}

const Info = (
  { boardId }: InfoProps
) => {

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">
  })

  if (!data) {
    return <InfoSkeleton />
  }

  return (
    <div
      className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md"
    >
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button
          variant="board"
          className="px-2"
        >
          <Link href='/' className="flex items-center ">
            <Image
              src='/logo.png'
              width={40}
              height={40}
              alt='Board logo'
            />
            <span className={cn("font-semibold text-xl ml-2 text-black", font.className)}>
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <div>
          <RenameModal boardTitle={data.title} id={data._id} fromBoard />
        </div>
      </Hint>
      <TabSeparator />
      <Actions
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>

      </Actions>
    </div>)
}

export default Info


export const InfoSkeleton = () => {
  return <div
    className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"
  />
}