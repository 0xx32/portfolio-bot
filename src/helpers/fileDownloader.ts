import Downloader from 'nodejs-file-downloader'
import path from 'node:path'

export const telegramFileDownloader = async (pathFile: string, directory: string = '') => {
	const downloader = new Downloader({
		url: `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${pathFile}`,
		directory: path.resolve(import.meta.dirname, '../../public', directory),
	})

	return await downloader.download()
}
