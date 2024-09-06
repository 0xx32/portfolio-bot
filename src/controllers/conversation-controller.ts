import { Composer } from 'grammy'
import { createConversation } from '@grammyjs/conversations'

import type { MyContext } from '@/types/bot'
import { addProject, changeContact, deleteProject } from '@/handlers/conservations'

export const conversationsComposer = new Composer<MyContext>()

conversationsComposer.use(
	createConversation(addProject),
	createConversation(deleteProject),
	createConversation(changeContact)
)
