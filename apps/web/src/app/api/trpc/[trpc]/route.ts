import { auth } from "@/auth";
import { appRouter } from "@repo/trpc/server/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";


const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async() => {
      const session  = await auth()

      if (!session) {
        return {
          session: null,
        };
      }
      
      return {
        session,
      };
    }
  });

export { handler as GET, handler as POST };
