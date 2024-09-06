import { Bot, GrammyError, HttpError, session } from 'grammy'
import { hydrate } from '@grammyjs/hydrate'
import { conversations, createConversation } from '@grammyjs/conversations'
import 'dotenv/config'

import type { MyContext } from './types/bot'
import { initialSession } from './core/session'
import { prisma } from './utils/db/prisma'
import { adminComposer, commandComposer, conversationsComposer, mainComposer } from './controllers'

const bot = new Bot<MyContext>(process.env.BOT_TOKEN!)

//middlewares
bot.use(session({ initial: initialSession }))
bot.use(conversations())
bot.use(hydrate())
bot.use(conversationsComposer)

//controllers
bot.use(commandComposer)
bot.use(mainComposer)
bot.use(adminComposer)

async function main() {
	try {
		bot.start()
		await prisma.$disconnect()
	} catch (error) {
		console.error(error)
		await prisma.$disconnect()
		process.exit(1)
	}
}

main()

bot.catch((err) => {
	const ctx = err.ctx
	console.error(`Error while handling update ${ctx.update.update_id}:`)
	const e = err.error
	if (e instanceof GrammyError) {
		console.error('Error in request:', e.description)
	} else if (e instanceof HttpError) {
		console.error('Could not contact Telegram:', e)
	} else {
		console.error('Unknown error:', e)
	}
})
