import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_EdDNLsSXo8zXmxox7xA5J_-JmBpMnjd96360NFIG0mwvPO4aV46X0VY2wEJ8J048",
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  console.log("AUTH_INFO", {
    authorization,
    user,
  });

  if (!authorization || !user) {
    return new Response("unauthorized", { status: 403 });
  }

  const { room } = await request.json();

  const board = await convex.query(api.board.get, { id: room });

  console.log("AUTH_INFO", {
    room,
    board,
    boardOrgId: board?.orgId,
    userOrgId: authorization.orgId,
  });

  if (board?.orgId !== authorization.orgId) {
    return new Response("unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Teammate",
    picture: user.imageUrl,
  };

  console.log({ userInfo });

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  console.log({ status, body }, "ALLOWED");
  return new Response(body, { status });
  // Get the current user from your database
  // const user = __getUserFromDB__(request);

  // Start an auth session inside your endpoint
  // const session = liveblocks.prepareSession(
  //   user.id,
  //   { userInfo: user.metadata } // Optional
  // );

  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user read access on their org, and write access on their group
  // session.allow(`${user.organization}:*`, session.READ_ACCESS);
  // session.allow(`${user.organization}:${user.group}:*`, session.FULL_ACCESS);

  // // Authorize the user and return the result
  // const { status, body } = await session.authorize();
  // return new Response(body, { status });
}
