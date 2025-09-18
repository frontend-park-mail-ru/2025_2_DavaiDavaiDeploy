import express from 'express'
import reload from 'reload'
import { execSync } from 'child_process'

const app = express()

app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Express')
  res.statusCode = 200
  console.log(`[${req.method}] ${req.url} ${res.statusCode}`)
  next()
})

app.use('/public', express.static('public'))

app.get('/', (_, response) => {
  response.sendFile('/index.html', { root: './' })
})

app.listen(3000, () => {
  console.log('Server running on http://127.0.0.1:3000')
})

reload(app).then(function () {
  execSync('npm run build', { stdio: 'inherit', shell: true })
})
