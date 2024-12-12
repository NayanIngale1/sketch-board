"use client";
import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { use } from "react";

interface DashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const { organization } = useOrganization()
  return (
    <div className="flex flex-col gap-y-4 flex-1 h-[calc(100%-80px)]">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={use(searchParams)}
        />
      )}
    </div>
  );
}

{/* <SignedIn>
  <div>Welcome to the authenticated home page!</div>
</SignedIn>
<SignedOut>
  <RedirectToSignIn />
</SignedOut> */}