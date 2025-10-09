import Layout from '../../components/layout/layout.js'
import { routes } from '../../routes/index.js'
import { Router } from './router.js'

const layout = new Layout(document.body)
layout.render()

export default Router.create(routes, layout.self)
