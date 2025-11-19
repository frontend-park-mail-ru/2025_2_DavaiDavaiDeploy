import { Component } from '@/modules/react';
import type { WithRouterProps } from './types/withRouterProps';
import { withRouter } from './withRouter';

interface RedirectProps {
	to: string;
}

class RedirectComponent extends Component<WithRouterProps & RedirectProps> {
	onMount() {
		this.props.router.navigate(this.props.to);
	}

	render() {
		return <></>;
	}
}

export const Redirect = withRouter(RedirectComponent);
