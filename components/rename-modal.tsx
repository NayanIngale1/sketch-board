"use client"

import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Input } from "./ui/input";

interface RenameModalProps {
  id: string;
  boardTitle: string;
  fromBoard?: boolean;
}


const RenameModal = ({ id, boardTitle, fromBoard = false }: RenameModalProps) => {
  const { mutate, pending } = useApiMutation(api.board.update);
  const [title, setTitle] = useState(boardTitle);
  const onSubmit = () => {
    mutate({ id, title })
      .then(() => {
        toast.success("Board renamed")
      })
      .catch(() => toast.error("Failed to rename board"));
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={fromBoard ? "board" : "ghost"}
          className={fromBoard ? "text-base font-normal px-2" : "p-3 cursor-pointer text-sm w-full justify-start font-normal"}
        >
          {!fromBoard && <Pencil className="h-4 w-4 mr-2" />}
          {fromBoard ? boardTitle : "Rename"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent >
        <AlertDialogHeader>
          <AlertDialogTitle>
            Edit board title
          </AlertDialogTitle>
          <AlertDialogDescription>
            Enter a new title for this board
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          disabled={pending}
          required
          maxLength={60}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Board title"
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} disabled={pending}>
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default RenameModal
