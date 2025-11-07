import { Component } from '@robocotik/react';
import type { LinkProps } from './types/link.props.ts';
import type { WithRouterProps } from './types/withRouterProps.ts';
import { withRouter } from './withRouter.tsx';

class LinkUnconnected extends Component<LinkProps & WithRouterProps> {
	handleClick = (e: Event) => {
		e.preventDefault();
		this.props.router.navigate(this.props.href);
	};

	render() {
		return (
			<a
				aria-label="Link that redirect to another route"
				href={this.props.href}
				className={this.props.className}
				onClick={this.handleClick}
			>
				{this.props.children}
			</a>
		);
	}
}

export const Link = withRouter(LinkUnconnected);
