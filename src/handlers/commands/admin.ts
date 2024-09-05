import { isAdmin } from '@/helpers'

import type { MyContext } from '@/types/bot'

export const adminHanlder = async (ctx: MyContext) => {
	if (ctx.from?.id && !isAdmin(ctx.from?.id)) return

	await ctx.conversation.enter('admin')
}
