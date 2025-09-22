/* eslint-disable no-console */
import { execSync } from 'child_process'
import express from 'express'
import path from 'path'
import reload from 'reload'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

const clientPath = path.join(__dirname, '../src')
const buildPath = path.join(__dirname, '../build')
const handlebarsPath = path.join(__dirname, '../src/handlebars')

// Middleware логгера
app.use((req, res, next) => {
	res.setHeader('X-Powered-By', 'Express')
	console.log(`[${req.method}] ${req.url}`)
	next()
})

// 📦 СТАТИКА
app.use('/src', express.static(clientPath))
app.use('/build', express.static(buildPath))
app.use('/src/handlebars', express.static(handlebarsPath))
app.use(
	'/reload',
	express.static(path.join(__dirname, '../node_modules/reload')),
)

// 🔄 SPA fallback
app.use((req, res, next) => {
	if (
		req.url.startsWith('/src/') ||
		req.url.startsWith('/build/') ||
		req.url.startsWith('/reload/')
	) {
		return next()
	}
	res.sendFile(path.join(clientPath, 'index.html'))
})

// 🚀 Запуск сервера
app.listen(PORT, () => {
	console.log(`✅ Server running at http://127.0.0.1:${PORT}`)
})

// 🔁 Reload + build
reload(app).then(() => {
	execSync('npm run build', { stdio: 'inherit', shell: true })
})
/* eslint-enable no-console */
