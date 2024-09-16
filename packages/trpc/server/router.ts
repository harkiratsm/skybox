import { folderRouter } from "./folder-router/router";
import { noteRouter } from "./note-router/router";
import { router } from "./trpc";

export const appRouter = router({
    note: noteRouter,
    folder: folderRouter,
    // different router slides here
})

export type AppRouter = typeof appRouter;