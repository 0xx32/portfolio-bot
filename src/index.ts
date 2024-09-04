import { Bot, session } from 'grammy'
import { hydrate } from '@grammyjs/hydrate'
import { conversations, createConversation } from '@grammyjs/conversations'
import 'dotenv/config'

import { prisma } from './db/prisma'
import { adminHanlder, startHandler } from './handlers/commands'
import { backHandler } from './handlers/actions'
import { addProject } from './conservations/addProject'
import type { MyContext } from './@types/bot'
import { isAdmin } from './helpers'

const bot = new Bot<MyContext>(process.env.BOT_TOKEN!)

//middlewares
bot.use(hydrate())
bot.use(session({ initial: () => ({}) }))
bot.use(conversations())
bot.use(createConversation(addProject))

//comand handlers
bot.command('start', startHandler)
bot.command('admin', adminHanlder)
bot.hears('Назад ↩️', backHandler)

bot.on('message', async (ctx) => {})

//callback query handlers
bot.callbackQuery('add-project', async (ctx) => {
	if (!isAdmin(ctx.from.id)) return

	await ctx.conversation.enter('addProject')
})

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
