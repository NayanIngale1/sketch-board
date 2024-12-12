import { use, useMemo } from "react";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { EmptyBoards } from "./empty-boards";

interface BoardListProps {
  orgId: string
  query: {
    search?: string;
    favorites?: string;
  }
}

export const BoardList = ({ orgId, query }: BoardListProps) => {

  const data = [] // TODO: change this to api call;


  if (!data?.length && query.search) {
    return (
      <EmptySearch />
    )
  }

  if (!data?.length && query.favorites) {
    return (
      <EmptyFavorites />
    )
  }

  if (!data?.length) {

    return (
      <EmptyBoards />
    )
  }
  return (
    <div>
      <h2>Board List</h2>
      {JSON.stringify(query)}
    </div>
  )
}