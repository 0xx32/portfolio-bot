import { Composer } from 'grammy'
import * as callbacks from '@/handlers/callbacks'
import type { MyContext } from '@/types/bot'

export const adminComposer = new Composer<MyContext>()

adminComposer.callbackQuery('admin', callbacks.adminCallback)
adminComposer.callbackQuery('admin.change-contact', callbacks.changeContactCallback)
adminComposer.callbackQuery('admin.users', callbacks.usersCallback)
adminComposer.callbackQuery('admin.projects', callbacks.projectsCallback)
adminComposer.callbackQuery('admin.all-projects', callbacks.allProjectsCallback)
adminComposer.callbackQuery('admin.add-project', callbacks.addProjectCallback)
adminComposer.callbackQuery('admin.delete-project', callbacks.deleteProjectCallback)
adminComposer.callbackQuery('admin.mailing', callbacks.mailingForUsersCallback)
