import type { MyContext } from '@/types/bot'

export const adminCallback = async (ctx: MyContext) => {
	await ctx.conversation.exit()

	await ctx.conversation.enter('admin')
	await ctx.answerCallbackQuery({})
}
