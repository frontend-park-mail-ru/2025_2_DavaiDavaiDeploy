import { Component } from '@robocotik/react';

export default class Layout extends Component {
	render() {
		return <div class="layout">{this.props.children}</div>;
	}
}
