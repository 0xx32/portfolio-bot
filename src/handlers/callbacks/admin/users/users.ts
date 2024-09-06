import type { MyContext } from '@/types/bot'
import { createInlineKeyboard } from '@/utils'
import { prisma } from '@/utils/db/prisma'

export const usersCallback = async (ctx: MyContext) => {
	const user = await prisma.user.findMany()

	await ctx.reply(`<b>Пользователи</b>:  ${user.length}`, {
		parse_mode: 'HTML',
		reply_markup: createInlineKeyboard([
			{
				label: 'Назад ↩️',
				data: 'admin',
			},
		]),
	})
	await ctx.deleteMessage()

	await ctx.answerCallbackQuery()
}
