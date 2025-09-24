import '../build/precompiled.js'
import Layout from './components/layout/layout.js'
import HTTPClient from './modules/HTTPClient/index.js'
import router from './modules/router/index.js'
import { routes } from './routes/index.js'

HTTPClient.configurate({ baseUrl: 'https://dummyjson.com' })

let contentContainer = document.createElement('div')
contentContainer.id = 'app'
document.body.appendChild(contentContainer)

const layout = new Layout(contentContainer)
layout.render()

router.configurate(routes, layout.self)
router.start()
