import fs from 'node:fs'
import path from 'node:path'

import settings from '@/settings'

const filePath = '../../../setting.json'

export const configurationСhange = async (key: string, value: any) => {
	const settingObj = await JSON.parse(JSON.stringify(settings))

	mutateObjectProperty(key, value, settingObj)
	fs.writeFile(
		path.join(import.meta.dirname + filePath),
		JSON.stringify(settingObj, null, 2),
		function writeJSON(err) {
			if (err) return console.log(err)
		}
	)

	return true
}

const mutateObjectProperty = (prop: string, value: string, obj: any) =>
	obj.constructor === Object &&
	Object.keys(obj).forEach((key) => {
		if (key === prop) obj[key] = value
		mutateObjectProperty(prop, value, obj[key])
	})
