import { fileRouter } from "./drive-router/router";
import { folderRouter } from "./folder-router/router";
import { noteRouter } from "./note-router/router";
import { router } from "./trpc";
import { userRouter } from "./user/router";

export const appRouter = router({
    note: noteRouter,
    folder: folderRouter,
    files: fileRouter,
    userRouter: userRouter,
    // different router slides here
})

export type AppRouter = typeof appRouter;