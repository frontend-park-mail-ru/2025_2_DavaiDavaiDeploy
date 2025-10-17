import Layout from '@/components/layout/layout'
import { routes } from '@/routes/index'
import { Router } from './router'

export type ComponentInstance = InstanceType<typeof Component>

const layout: ComponentInstance = new Layout(document.body)
layout.render()

export default Router.create(routes, layout.self)
