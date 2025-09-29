/* eslint-disable no-console */
import express from 'express'
import path from 'path'

const app = express()
const PORT = 3000

app.use(express.static('src'))

app.get('*', (req, res) => {
	res.sendFile(path.resolve('src', 'index.html'))
})

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
	console.log(`Откройте http://localhost:${PORT} в браузере`)
})

/* eslint-enable no-console */
