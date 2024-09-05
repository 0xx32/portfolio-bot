import type { Context, SessionFlavor } from 'grammy'
import type { Conversation, ConversationFlavor } from '@grammyjs/conversations'
import type { HydrateFlavor } from '@grammyjs/hydrate'

export type MyContext = HydrateFlavor<Context & ConversationFlavor & SessionFlavor<SessionData>>
export type MyConversation = Conversation<MyContext>

export interface SessionData {}

export interface InlineButton {
	label: string
	data: string
	url?: string
}
