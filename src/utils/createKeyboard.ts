import type { InlineButton } from '@/types/bot'
import { InlineKeyboard, Keyboard } from 'grammy'

interface CustomButton {
	label: string
	url?: string
}

interface KeyboardOptions {
	isBack?: boolean
}
export const createKeyboard = (buttons: CustomButton[], options: KeyboardOptions = {}) => {
	const keyboard = new Keyboard()
	const buttonCount = buttons.length
	const buttonsPerColumn = Math.ceil(buttonCount / 2)

	for (let i = 0; i < buttonsPerColumn; i++) {
		const firstButtonIndex = i
		const secondButtonIndex = i + buttonsPerColumn

		if (!buttons[firstButtonIndex]) break

		keyboard.text(buttons[firstButtonIndex].label)

		if (secondButtonIndex < buttonCount && buttons[secondButtonIndex]) {
			keyboard.text(buttons[secondButtonIndex].label)
		}

		keyboard.row()
	}
	if (options.isBack) keyboard.text('Назад ↩️')

	return keyboard
}

interface InlineKeyboardOptions {
	numberButtonsInRow: number
}

export const createInlineKeyboard = (
	buttons: InlineButton[],
	options: InlineKeyboardOptions = {
		numberButtonsInRow: 1,
	}
) => {
	const keyboard = new InlineKeyboard()

	buttons.forEach((button, index) => {
		if (index % options.numberButtonsInRow === 0 && index !== 0) keyboard.row()

		if (button.url) return keyboard.url(button.label, button.url)

		keyboard.text(button.label, button.data)
	})

	return keyboard
}
