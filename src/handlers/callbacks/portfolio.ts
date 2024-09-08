import type { MyContext } from '@/types/bot'
import { portfolioHandler } from '../commands'

export const portfolioCallback = async (ctx: MyContext) => {
	await ctx.answerCallbackQuery({})

	await portfolioHandler(ctx)
}
