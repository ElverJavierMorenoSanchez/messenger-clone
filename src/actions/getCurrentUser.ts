import prisma from "@/libs/prismadb";
import getSession from "./getSession";

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (error: any) {
    console.log(
      "🚀 ~ file: getCurrentUser.ts:20 ~ getCurrentUser ~ error:",
      error
    );
    return null;
  }
};
