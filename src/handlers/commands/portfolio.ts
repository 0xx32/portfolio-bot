import { InlineKeyboard, InputFile } from 'grammy'

import type { MyContext } from '@/types/bot'

import { createInlineKeyboard, mainMenuKeyboard } from '@/utils'
import { prisma } from '@/utils/db/prisma'

export const portfolioHandler = async (ctx: MyContext) => {
	await ctx.deleteMessage()
	const projects = await prisma.projects.findMany()

	projects
		.sort((a, b) => a.id - b.id)
		.forEach(async (project) => {
			await ctx.replyWithPhoto(new InputFile(project.imagePath), {
				caption: `<b>${project.title}</b>`,
				reply_markup: new InlineKeyboard().url('Подробнее', 'https://grammy.dev/'),
				parse_mode: 'HTML',
			})
		})

	setTimeout(async () => {
		ctx.reply(`<b>Оценил мои работы?</b>\n\n❤️ Если тебе понравилось — жми <b>связаться</b>\n`, {
			reply_markup: createInlineKeyboard(await mainMenuKeyboard()),
			parse_mode: 'HTML',
		})
	}, 1000)
}
