import { Bot, InputFile } from 'grammy'
import 'dotenv/config'
import { createInlineKeyboard, createKeyboard } from './utils/createKeyboard'
import { startMenuKeyboard } from './utils/buttons'
import { log } from 'console'
import { startMessageHtml } from './utils/messages'

const bot = new Bot(process.env.BOT_TOKEN!)

bot.command('start', (ctx) => {
	ctx.reply('Welcome! Up and running.', {})

	// ctx.api.sendPhoto(
	// 	ctx.chat.id,
	// 	'https://yandex.ru/images/search?text=картинки&img_url=https%3A%2F%2Fwww.tapeciarnia.pl%2Ftapety%2Fnormalne%2F253304_gory_jezioro_swierki_swiatlo_cien_odbicie.jpg&pos=0&rpt=simage&stype=image&lr=35&parent-reqid=1725385284026539-7643823848158709892-balancer-l7leveler-kubr-yp-klg-242-BAL&source=serp'
	// )
})

bot.on('message', async (ctx) => {
	await ctx.replyWithPhoto(new InputFile('./public/images/' + 'image.png'), {
		caption: startMessageHtml,
		parse_mode: 'HTML',
		reply_markup: createInlineKeyboard(startMenuKeyboard),
	})
})

bot.start()
