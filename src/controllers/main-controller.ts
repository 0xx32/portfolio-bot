import { Composer } from 'grammy'
import * as callbacks from '@/handlers/callbacks'
import type { MyContext } from '@/types/bot'

export const mainComposer = new Composer<MyContext>()

mainComposer.callbackQuery('portfolio', callbacks.portfolioCallback)
mainComposer.callbackQuery('check-sub', callbacks.checkSubscriptionCallback)
