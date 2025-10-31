import { Component } from '@robocotik/react';
import type { NavigateButtonProps } from './types/navigateButton.props.ts';
import type { RouterContextValue } from './types/routerContext.ts';
import type { WithRouterProps } from './types/withRouterProps.ts';
import { withRouter } from './withRouter.tsx';

export class NavigateButtonComponent extends Component<
	NavigateButtonProps & WithRouterProps,
	{},
	RouterContextValue
> {
	constructor(props: NavigateButtonProps & WithRouterProps) {
		super(props);

		if (!this.props.router) {
			throw Error('no context provided in Button');
		}
	}

	handleClick = (e: Event) => {
		e.preventDefault();
		this.props.router.navigate(this.props.href);
	};

	render() {
		return (
			<button className={this.props.className} onClick={this.handleClick}>
				{this.props.children}
			</button>
		);
	}
}

export const NavigateButton = withRouter(NavigateButtonComponent);
