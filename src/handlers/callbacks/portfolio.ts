import type { MyContext } from '@/types/bot'
import { prisma } from '@/utils/db/prisma'
import { InlineKeyboard, InputFile } from 'grammy'

export const portfolioCallback = async (ctx: MyContext) => {
	await ctx.answerCallbackQuery({})
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

	setTimeout(() => {
		ctx.reply(
			`<b>📍Ты в нашем боте Glow Studio, тут можно</b>:\n
				👀 Посмотреть наши работы
				🖊 Заказать любой дизайн
				⚙️ Заказать любую разработку\n
				Остались вопросы? Хотите сделать заказ? — Пишите нам`,
			{
				reply_markup: new InlineKeyboard().url('Все проекты', 'https://grammy.dev/'),
				parse_mode: 'HTML',
			}
		)
	}, 1000)
}
