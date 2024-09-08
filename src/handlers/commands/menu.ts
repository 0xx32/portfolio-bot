import type { MyContext } from '@/types/bot'
import { adminMenuKeyboard, createInlineKeyboard } from '@/utils'

export const menuHandler = async (ctx: MyContext) => {
	await ctx.reply('Выберите действие', {
		reply_markup: createInlineKeyboard(adminMenuKeyboard, {
			numberButtonsInRow: 2,
		}),
	})
}
