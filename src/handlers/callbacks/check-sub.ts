import type { MyContext } from '@/types/bot'
import { startHandler } from '../commands'

const chats = ['-1002258532636']

const chatId = '-1002258532636'

export const checkSubscriptionCallback = async (ctx: MyContext) => {
	if (!ctx?.from?.id) return

	const status = (await ctx.api.getChatMember(chatId, ctx.from.id)).status

	if (status === 'left') {
		await ctx.answerCallbackQuery('Вы не подписаны на канал')
	} else {
		await ctx.answerCallbackQuery('Спасибо за подписку!')
		ctx.deleteMessage()
		startHandler(ctx)
	}
}
