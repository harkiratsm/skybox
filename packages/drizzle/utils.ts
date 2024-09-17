import { customAlphabet } from "nanoid"

export function genId(pfx: string) {
    const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10)
    return [pfx, nanoid()].join('_')
}