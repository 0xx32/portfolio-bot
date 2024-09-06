import type { Context, MiddlewareObj, NextFunction, SessionFlavor } from 'grammy'
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

export type Middleware = MiddlewareFn | MiddlewareObj
// Omitted type parameters again.
export type MiddlewareFn = (ctx: Context, next: NextFunction) => Promise<unknown>
// with
