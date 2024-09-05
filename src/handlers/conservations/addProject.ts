import type { MyContext, MyConversation } from '@/types/bot'
import { prisma } from '@/utils/db/prisma'

import { telegramFileDownloader } from '@/helpers/fileDownloader'
import { createInlineKeyboard } from '@/utils/createKeyboard'

export async function addProject(conversation: MyConversation, ctx: MyContext) {
	await ctx.editMessageText('Введите название проекта')
	const title = await conversation.form.text()

	await ctx.reply('Загрузите фото')
	let photoCtx = await conversation.waitFor(':photo')

	// await ctx.reply('Введите описание проекта')
	// let description = await conversation.form.text()

	const file = await photoCtx.getFile()
	if (!file.file_path) return await ctx.reply('Не удалось загрузить изображение')

	const download = await telegramFileDownloader(file.file_path, 'images')
	const filePath = download.filePath

	const newProject = await conversation.external(async () => {
		return await prisma.projects.create({
			data: {
				title,
				imagePath: filePath || '',
			},
		})
	})

	return ctx.reply('Проект добавлен id: ' + newProject.id, {
		reply_markup: createInlineKeyboard([{ label: 'Вернуться в меню ↩️', data: 'admin' }]),
	})

	//.split('/').slice(-1)[0])
}
