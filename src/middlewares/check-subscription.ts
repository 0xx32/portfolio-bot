import type { NextFunction } from 'grammy'
import type { MyContext } from '@/types/bot'
import { createInlineKeyboard } from '@/utils'

const chats = ['-1002258532636']

export const checkSubscription = async (ctx: MyContext, next: NextFunction) => {
	if (!ctx?.from?.id) return

	const status = (await ctx.api.getChatMember(chats[0]!, ctx.from.id)).status

	if (status === 'left') {
		const linkChanel = (await ctx.api.getChat(chats[0]!)).invite_link

		return await ctx.reply('Подпишитесь на канал', {
			reply_markup: createInlineKeyboard([
				{
					label: 'Подписаться',
					data: linkChanel!,
					url: linkChanel!,
				},
				{
					label: 'Проверить',
					data: 'check-sub',
				},
			]),
		})
	} else {
		next()
	}
}
