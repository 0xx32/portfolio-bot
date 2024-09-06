import { isAdmin } from '@/helpers'

import type { MyContext } from '@/types/bot'
import { adminMenuKeyboard, createInlineKeyboard } from '@/utils'

export const adminHanlder = async (ctx: MyContext) => {
	if (ctx.from?.id && !isAdmin(ctx.from?.id)) return

	// await ctx.conversation.enter('admin')

	await ctx.reply('Выберите действие', {
		reply_markup: createInlineKeyboard(adminMenuKeyboard, {
			numberButtonsInRow: 2,
		}),
	})
}
