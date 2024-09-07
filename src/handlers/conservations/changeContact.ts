import { InlineKeyboard } from 'grammy'

import type { MyContext, MyConversation } from '@/types/bot'
import { createInlineKeyboard } from '@/utils'
import { prisma } from '@/utils/db/prisma'

export const changeContact = async (conversation: MyConversation, ctx: MyContext) => {
	const contactList = await prisma.contacts.findMany()

	const contactsButtons = contactList.map((contact) => ({
		label: contact.title,
		data: contact.title.toLowerCase(),
	}))

	await ctx.editMessageText('Какое поле вы хотите поменять?', {
		reply_markup: createInlineKeyboard([...contactsButtons, { label: 'Назад ↩️', data: 'admin' }]),
	})

	const contactCtx = await conversation.wait()

	if (!contactCtx.callbackQuery?.data) return await conversation.skip()

	await contactCtx.answerCallbackQuery()

	const selectedСontact = contactCtx.callbackQuery?.data

	if (selectedСontact === 'admin') return await conversation.skip()

	await contactCtx.editMessageText('Введите новое значение')
	const newContactCtx = await conversation.waitFor(':text')

	if (selectedСontact === 'telegram' && !newContactCtx.message?.text?.includes('https://t.me/')) {
		await ctx.reply('Неверная ссылка')
		await conversation.skip()
	}

	const newContact = await conversation.external(async () => {
		return await prisma.contacts.update({
			where: {
				slug: contactCtx.callbackQuery?.data,
			},
			data: {
				value: newContactCtx.message?.text,
			},
		})
	})

	if (!newContact) {
		return ctx.reply(`не удалось изменить`, {
			reply_markup: new InlineKeyboard().text('Вернуться в меню ↩️', 'admin'),
		})
	}

	return ctx.reply(`Новый ${selectedСontact}: ${newContactCtx.message?.text}`, {
		reply_markup: new InlineKeyboard().text('Вернуться в меню ↩️', 'admin'),
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
