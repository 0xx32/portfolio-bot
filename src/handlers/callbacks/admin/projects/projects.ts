import type { MyContext } from '@/types/bot'
import { adminProjectsKeyboard, createInlineKeyboard } from '@/utils'
import { prisma } from '@/utils/db/prisma'

export const projectsCallback = async (ctx: MyContext) => {
	const projects = await prisma.projects.findMany()

	await ctx.deleteMessage()
	await ctx.reply(`<b>Проекты</b> \n\n Всего проектов: ${projects.length}`, {
		parse_mode: 'HTML',
		reply_markup: createInlineKeyboard(adminProjectsKeyboard),
	})

	await ctx.answerCallbackQuery()
}

export const allProjectsCallback = async (ctx: MyContext) => {
	const projects = await prisma.projects.findMany()
	await ctx.deleteMessage()

	const projectText = projects
		.map((project) => {
			return `<b>ID: ${project.id}</b>\n<b>${project.title}</b>  `
		})
		.join('\n\n')

	await ctx.reply(projectText + '\n\nКолличество проектов: ' + projects.length, {
		parse_mode: 'HTML',
		reply_markup: createInlineKeyboard(adminProjectsKeyboard),
	})
}

export const addProjectCallback = async (ctx: MyContext) => {
	await ctx.deleteMessage()
	await ctx.conversation.enter('addProject')
	await ctx.answerCallbackQuery()
}
export const deleteProjectCallback = async (ctx: MyContext) => {
	await ctx.deleteMessage()
	await ctx.conversation.enter('deleteProject')
	await ctx.answerCallbackQuery()
}
