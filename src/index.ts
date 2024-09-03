import { Bot, InputFile } from 'grammy'
import 'dotenv/config'
import { createInlineKeyboard, createKeyboard } from './utils/createKeyboard'
import { startMenuKeyboard } from './utils/buttons'
import { log } from 'console'
import { startMessageHtml } from './utils/messages'
import { prisma } from './db/prisma'

const bot = new Bot(process.env.BOT_TOKEN!)

bot.command('start', async (ctx) => {
	const user = await prisma.user.findUnique({
		where: {
			id: ctx.from?.id,
		},
	})
	console.log(user)

	console.log(ctx.from?.id)

	if (!user && ctx.from?.id) {
		console.log(ctx.from?.id)

		await prisma.user.create({
			data: {
				accountId: ctx.from?.id,
			},
		})
	}

	const phote = new InputFile('./public/images/' + 'image.png')
	const message = await ctx.replyWithPhoto(phote, {
		caption: startMessageHtml,
		parse_mode: 'HTML',
		reply_markup: createInlineKeyboard(startMenuKeyboard),
	})

	console.log(message.photo[3].file_id)
})

async function main() {
	bot.start()
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
