import type { MyContext, MyConversation } from '@/@types/bot'
import { prisma } from '@/db/prisma'

import { telegramFileDownloader } from '@/helpers/fileDownloader'

export async function addProject(conversation: MyConversation, ctx: MyContext) {
	await ctx.editMessageText('Введите название проекта')
	const title = await conversation.form.text()

	await ctx.reply('Загрузите фото')
	let photoCtx = await conversation.waitFor(':photo')

	// await ctx.reply('Введите описание проекта')
	// let description = await conversation.form.text()

	const file = await photoCtx.getFile()
	if (!file.file_path) return

	const download = await telegramFileDownloader(file.file_path, 'images')
	const filePath = download.filePath

	const project = await prisma.projects.create({
		data: {
			title,
			imagePath: filePath || '',
		},
	})

	return ctx.reply('Проект добавлен id: ' + project.id)

	//.split('/').slice(-1)[0])
}
