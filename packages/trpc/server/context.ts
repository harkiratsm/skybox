import {getSession} from "next-auth/react"
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

export const createTrpcContext = async ( opts: any) => {
    const session = await getSession( opts.req )
    if ( !session ) {
        return {
        session: null,
        }
    }
    return {
        session,
    }
}


export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>;