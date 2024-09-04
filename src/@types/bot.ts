import type { Context } from 'grammy'
import type { Conversation, ConversationFlavor } from '@grammyjs/conversations'
import type { HydrateFlavor } from '@grammyjs/hydrate'

export type MyContext = HydrateFlavor<Context & ConversationFlavor>
export type MyConversation = Conversation<MyContext>
