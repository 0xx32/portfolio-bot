import { Context } from 'grammy'
import { isAdmin } from '@/helpers'
import { adminMenuKeyboard, createInlineKeyboard } from '@/utils'

export const adminHanlder = async (ctx: Context) => {
	if (ctx.from?.id && !isAdmin(ctx.from?.id)) return

	await ctx.reply('Выберите действие', {
		reply_markup: createInlineKeyboard(adminMenuKeyboard, {
			numberButtonsInRow: 2,
		}),
	})
}
