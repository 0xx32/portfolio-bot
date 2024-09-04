import type { Context } from 'grammy'
import { startHandler } from '../commands'

export const backHandler = async (ctx: Context) => {
	ctx.deleteMessage()
	startHandler(ctx)
}
