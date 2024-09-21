import { initTRPC } from '@trpc/server'
import { SuperJSON } from 'superjson'
import { TrpcContext } from './context'
import { OpenApiMeta } from 'trpc-openapi'

const t = initTRPC.context<TrpcContext>().meta<OpenApiMeta>().create({
    transformer: SuperJSON,
})


export const router = t.router
export const procedure = t.procedure 