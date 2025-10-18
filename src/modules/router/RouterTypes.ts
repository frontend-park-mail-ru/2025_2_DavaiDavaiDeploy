export interface RouteConfig {
	href: string
	component: any
	hasHeader?: boolean
	hasFooter?: boolean
}

export interface Routes {
	[key: string]: RouteConfig
}
