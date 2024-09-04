import { Context, InputFile } from 'grammy'

import { startMessageHtml, createInlineKeyboard, startMenuKeyboard } from '@/utils'
import { prisma } from '@/db/prisma'

export const startHandler = async (ctx: Context) => {
	const user = await prisma.user.findUnique({
		where: {
			accountId: ctx.from?.id,
		},
	})

	if (!user && ctx.from?.id) {
		await prisma.user.create({
			data: {
				accountId: ctx.from?.id,
			},
		})
	}

	const bannerPath = './public/images/banner.png'

	const banner = await prisma.staticFiles.findFirst({
		where: {
			path: bannerPath,
		},
	})

	if (!banner) {
		const phote = new InputFile(bannerPath)

		const message = await ctx.replyWithPhoto(phote, {
			caption: startMessageHtml,
			parse_mode: 'HTML',
			reply_markup: createInlineKeyboard(startMenuKeyboard),
		})

		await prisma.staticFiles.create({
			data: {
				fileId: message.photo[3]?.file_id ?? '',
				path: bannerPath,
			},
		})

		return
	}

	await ctx.replyWithPhoto(banner.fileId, {
		caption: startMessageHtml,
		parse_mode: 'HTML',
		reply_markup: createInlineKeyboard(startMenuKeyboard),
	})
}
