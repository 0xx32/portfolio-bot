import { Composer } from 'grammy'
import * as callbacks from '@/handlers/callbacks'
import type { MyContext } from '@/types/bot'
import { checkSubscription } from '@/middlewares'
import { adminHanlder, startHandler } from '@/handlers/commands'

export const commandComposer = new Composer<MyContext>()

commandComposer.command('start', checkSubscription, startHandler)
commandComposer.command('admin', adminHanlder)
