import type { MyContext } from '@/types/bot'
import { adminHanlder } from '../../commands'

export const adminCallback = async (ctx: MyContext) => {
	adminHanlder(ctx)
	await ctx.deleteMessage()
	await ctx.answerCallbackQuery()
}

export const changeContactCallback = async (ctx: MyContext) => {
	await ctx.conversation.enter('changeContact')
	await ctx.answerCallbackQuery()
}
