import { noteRouter } from "./note-router/router";
import { router } from "./trpc";

export const appRouter = router({
    note: noteRouter,
    // different router slides here
})

export type AppRouter = typeof appRouter;