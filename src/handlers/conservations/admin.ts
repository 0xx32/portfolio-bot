import type { MyContext, MyConversation } from '@/types/bot'
import { isAdmin } from '@/helpers'

import { createInlineKeyboard } from '@/utils/createKeyboard'
import { adminMenuKeyboard } from '@/keyboards/buttons'

export async function admin(conversation: MyConversation, ctx: MyContext) {
	if (!ctx?.from?.id || !isAdmin(ctx.from.id)) return

	await ctx.reply('Выберите действие', {
		reply_markup: createInlineKeyboard(adminMenuKeyboard, {
			numberButtonsInRow: 2,
		}),
	})

	const actionQuery = await conversation.waitFor('callback_query:data')

	if (actionQuery.update.callback_query.data === 'change-contact') {
		await actionQuery.conversation.enter('changeContact')
		await actionQuery.answerCallbackQuery()
	}

	if (actionQuery.update.callback_query.data === 'add-project') {
		await actionQuery.conversation.enter('addProject')
		await actionQuery.answerCallbackQuery()
	}
}
