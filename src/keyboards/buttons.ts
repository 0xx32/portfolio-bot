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
		label: 'Добавить проект',
		data: 'add-project',
	},
	{
		label: 'Поменять контакты',
		data: 'change-contact',
	},
]
