import './build/partials/logo.js'
import './build/precompiled.js'
import Layout from './components/layout/layout.js'
import Router from './modules/router/index.js'
import { routes } from './routes/index.js'

const contentContainer = document.createElement('div')
contentContainer.id = 'app'
contentContainer.classList.add('app')
document.body.appendChild(contentContainer)

const layout = new Layout(contentContainer)
layout.render()

export const router = Router.create(routes, layout.self)
router.start()
