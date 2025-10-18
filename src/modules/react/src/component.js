import equal from 'fast-deep-equal'
import { destroyDOM } from './destroy-dom.js'
import { DOM_TYPES, extractChildren } from './h.js'
import { mountDOM } from './mount-dom.js'
import { patchDOM } from './patch-dom.js'
import { enqueueJob } from './scheduler.js'

export class Component {
	#isMounted = false
	#vdom = null
	#hostEl = null
	#contextValue = null

	get context() {
		return this.#contextValue
	}

	constructor(props = {}) {
		this.props = props
	}

	onMount() {
		return Promise.resolve()
	}
	onUnmount() {
		return Promise.resolve()
	}
	onUpdate() {
		return Promise.resolve()
	}
	onWillUnmount() {
		return Promise.resolve()
	}

	get elements() {
		if (this.#vdom == null) {
			return []
		}
		if (this.#vdom.type === DOM_TYPES.FRAGMENT) {
			return extractChildren(this.#vdom).flatMap(child => {
				if (child.type === DOM_TYPES.COMPONENT) {
					return child.component.elements
				}
				return [child.el]
			})
		}
		return [this.#vdom.el]
	}
	get firstElement() {
		return this.elements[0]
	}
	get offset() {
		if (this.#vdom.type === DOM_TYPES.FRAGMENT) {
			return Array.from(this.#hostEl.children).indexOf(this.firstElement)
		}
		return 0
	}

	updateProps(props) {
		const newProps = { ...this.props, ...props }
		if (equal(this.props, newProps)) {
			return
		}
		this.props = newProps
		this.#patch()
	}

	setState(state) {
		if (typeof state === 'function') {
			this.state = {
				...this.state,
				...state(this.state, this.props),
			}
		} else {
			this.state = { ...this.state, ...state }
		}
		this.#patch()
	}

	mount(hostEl, index = null) {
		if (this.#isMounted) {
			throw new Error('Component is already mounted')
		}

		if (this.constructor.contextType != null) {
			this.#contextValue = this.constructor.contextType.value
			this.constructor.contextType.subscribe(this)
		}

		this.#vdom = this.render()
		mountDOM(this.#vdom, hostEl, index, this)
		this.#hostEl = hostEl
		this.#isMounted = true
	}
	unmount() {
		if (!this.#isMounted) {
			throw new Error('Component is not mounted')
		}

		this.constructor.contextType?.unsubscribe(this)

		enqueueJob(() => this.onWillUnmount())
		destroyDOM(this.#vdom)
		enqueueJob(() => this.onUnmount())
		this.#vdom = null
		this.#hostEl = null
		this.#isMounted = false
	}

	#patch() {
		if (!this.#isMounted) {
			throw new Error('Component is not mounted')
		}
		const vdom = this.render()
		this.#vdom = patchDOM(this.#vdom, vdom, this.#hostEl, this)
		enqueueJob(() => this.onUpdate())
	}

	setContext(context) {
		this.#contextValue = context
		this.#patch()
	}
}
