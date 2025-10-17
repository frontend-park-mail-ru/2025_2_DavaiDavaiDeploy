export type ComponentInstance = InstanceType<typeof Component>

export interface RouteConfig {
	href: string
	component: ComponentInstance
	hasHeader?: boolean
	hasFooter?: boolean
}

export interface Routes {
	[key: string]: RouteConfig
}
