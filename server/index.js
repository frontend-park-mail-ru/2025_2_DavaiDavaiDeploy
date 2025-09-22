/* eslint-disable no-console */

import { execSync } from 'child_process'
import express from 'express'
import path from 'path'
import reload from 'reload'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use((req, res, next) => {
	res.setHeader('X-Powered-By', 'Express')
	console.log(`[${req.method}] ${req.url}`)
	next()
})

// Обслуживаем статические файлы
app.use('/src', express.static('src'))
app.use('/reload', express.static('node_modules/reload'))

// Только для не-статических путей отправляем index.html
app.get('/', (_, response) => {
	response.sendFile(path.join(__dirname, '../index.html'))
})

app.get('/*path', (req, response, next) => {
	// Пропускаем статические файлы и reload
	if (req.url.startsWith('/public/') || req.url.startsWith('/reload/')) {
		return next()
	}
	response.sendFile(path.join(__dirname, '../index.html'))
})

app.listen(3000, () => {
	console.log('Server running on http://127.0.0.1:3000')
})

reload(app).then(function () {
	execSync('npm run build', { stdio: 'inherit', shell: true })
})

/* eslint-enable no-console */
