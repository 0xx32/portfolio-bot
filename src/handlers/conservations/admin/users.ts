import type { MyContext, MyConversation } from '@/types/bot'
import { prisma } from '@/utils/db/prisma'

export const mailingForUsers = async (conversation: MyConversation, ctx: MyContext) => {
	await ctx.reply('Введите текст рассылки')

	const text = await conversation.form.text()

	const users = await conversation.external(async () => {
		return await prisma.user.findMany()
	})

	if (!users) return await ctx.reply('Пользователи не найдены')

	await ctx.reply('Рассылка запущена')

	const promises = users.map(
		async (user) =>
			new Promise((resolve) => resolve(ctx.api.sendMessage(Number(user.chatId), text, { parse_mode: 'HTML' })))
	)

	Promise.all([promises]).then(() => ctx.reply('Рассылка завершена'))
}
