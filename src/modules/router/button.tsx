import { Component } from '@robocotik/react';
import { RouterContext } from './routerContext';
import type { NavigateButtonProps } from './types/navigateButton.props.ts';
import type { RouterContextValue } from './types/routerContext.ts';

export class NavigateButton extends Component<
	NavigateButtonProps,
	{},
	RouterContextValue
> {
	static readonly contextType = RouterContext;

	constructor(props: NavigateButtonProps) {
		super(props);

		if (!this.context) {
			throw Error('no context provided in Button');
		}
	}

	handleClick = (e: Event) => {
		e.preventDefault();
		this.context.navigate(this.props.href);
	};

	render() {
		return (
			<button className={this.props.className} onClick={this.handleClick}>
				{this.props.children}
			</button>
		);
	}
}
