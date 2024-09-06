import settings from '../../setting.json'

export const startMenuKeyboard = [
	{
		label: 'Связаться',
		data: 'contact',
		url: settings.telegram,
	},
	{
		label: 'Портфолио',
		data: 'portfolio',
	},
]
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
