import type { MyContext, MyConversation } from '@/types/bot'
import { configurationСhange } from '@/helpers'
import { createInlineKeyboard } from '@/utils'
import settings from '@/settings'

import { InlineKeyboard } from 'grammy'

export const changeContact = async (conversation: MyConversation, ctx: MyContext) => {
	// const contactList = await prisma.contacts.findMany()

	await ctx.editMessageText('Какое поле вы хотите поменять?', {
		reply_markup: createInlineKeyboard([
			{ label: 'Telegram', data: settings.telegram },
			{ label: 'Назад ↩️', data: 'back' },
		]),
	})

	const contactCtx = await conversation.waitFor('callback_query:data')
	await contactCtx.answerCallbackQuery()

	await contactCtx.editMessageText('Введите новое значение')
	const newContactCtx = await conversation.waitFor(':text')

	if (!newContactCtx.message?.text?.includes('https://t.me/')) {
		await ctx.reply('Неверная ссылка')
		await conversation.skip()
	}

	const newContact = {
		name: 'Telegram',
		value: newContactCtx.message?.text,
	}

	const saveContact = await configurationСhange('telegram', newContactCtx.message?.text)

	if (!saveContact) {
		return ctx.reply(`не удалось изменить`, {
			reply_markup: new InlineKeyboard().text('Назад ↩️', 'admin'),
		})
	}

	return ctx.reply(`Новый ${newContact.name}: ${newContact.value}`, {
		reply_markup: new InlineKeyboard().text('Назад ↩️', 'admin'),
	})

	// configurationСhange('contacts.telgram', newContactCtx.message?.text)

	// const newContact = await conversation.external(async () => {
	// 	return await prisma.contacts.update({
	// 		where: {
	// 			slug: String(contactCtx.update.callback_query.data),
	// 		},
	// 		data: {
	// 			value: newContactCtx.message?.text,
	// 		},
	// 	})
	// })
}
