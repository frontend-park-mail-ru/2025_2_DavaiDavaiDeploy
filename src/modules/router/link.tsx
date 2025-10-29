import { Component } from '@robocotik/react';
import { RouterContext } from './routerContext';
import type { LinkProps } from './types/link.props.ts';
import type { RouterContextValue } from './types/routerContext.ts';

export class Link extends Component<LinkProps, {}, RouterContextValue> {
	static readonly contextType = RouterContext;

	constructor(props: LinkProps) {
		super(props);

		if (!this.context) {
			throw Error('no context provided in Link');
		}
	}

	handleClick = (e: Event) => {
		e.preventDefault();
		this.context.navigate(this.props.href);
	};

	render() {
		return (
			<a
				href={this.props.href}
				className={this.props.className}
				onClick={this.handleClick}
			>
				{this.props.children}
			</a>
		);
	}
}
