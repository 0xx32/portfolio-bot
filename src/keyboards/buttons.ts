import { prisma } from '@/utils/db/prisma'

export const mainMenuKeyboard = async () => {
	const telegram = await prisma.contacts.findUnique({
		where: {
			slug: 'telegram',
		},
	})

	return [
		{
			label: 'Связаться',
			data: 'contact',
			url: telegram?.value,
		},
		{
			label: 'Портфолио',
			data: 'portfolio',
		},
	]
}

export const adminMenuKeyboard = [
	{
		label: 'Проекты',
		data: 'admin.projects',
	},

	{
		label: 'Поменять контакты',
		data: 'admin.change-contact',
	},
	{
		label: 'Пользователи',
		data: 'admin.users',
	},
]
export const adminProjectsKeyboard = [
	{
		label: 'Все проекты',
		data: 'admin.all-projects',
	},
	{
		label: '➕  Добавить проект',
		data: 'admin.add-project',
	},
	{
		label: '➖  Удалить проект',
		data: 'admin.delete-project',
	},
	{
		label: 'Назад ↩️',
		data: 'admin',
	},
]
