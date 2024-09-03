import { InlineKeyboard, Keyboard } from 'grammy'

interface Button {
	label: string
	data: string
	url?: string
}

interface KeyboardOptions {
	isBack?: boolean
}
export const createKeyboard = (buttons: Button[], options: KeyboardOptions) => {
	const keyboard = new Keyboard()
	const buttonCount = buttons.length
	const buttonsPerColumn = Math.ceil(buttonCount / 2)

	for (let i = 0; i < buttonsPerColumn; i++) {
		const firstButtonIndex = i
		const secondButtonIndex = i + buttonsPerColumn

		keyboard.text(buttons[firstButtonIndex].label)

		if (secondButtonIndex < buttonCount) {
			keyboard.text(buttons[secondButtonIndex].label)
		}

		keyboard.row()
	}
	if (options.isBack) keyboard.text('Назад ↩️')

	return keyboard
}

export const createInlineKeyboard = (buttons: Button[]) => {
	const keyboard = new InlineKeyboard()

	buttons.forEach((button) => {
		if (button.url) return keyboard.url(button.label, button.url)

		keyboard.text(button.label, button.data)
	})

	return keyboard
}
