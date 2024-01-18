import prisma from "@/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

const getConversations = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) return [];

    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: { sender: true, seen: true },
        },
      },
    });

    return conversations;
  } catch (error: any) {
    console.log(
      "🚀 ~ file: getConversations.ts:7 ~ getConversations ~ error:",
      error
    );
    return [];
  }
};

export default getConversations;
