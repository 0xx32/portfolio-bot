import type { MyContext } from '@/types/bot'
import { prisma } from '@/utils/db/prisma'
import { InlineKeyboard, InputFile } from 'grammy'

export const portfolioCallback = async (ctx: MyContext) => {
	await ctx.answerCallbackQuery({})

	const projects = await prisma.projects.findMany()

	projects
		.sort((a, b) => a.id - b.id)
		.forEach(async (project) => {
			await ctx.replyWithPhoto(new InputFile(project.imagePath), {
				caption: project.title,
				reply_markup: new InlineKeyboard().url('Подробнее', 'https://grammy.dev/'),
			})
		})

	await ctx.reply('')
}
