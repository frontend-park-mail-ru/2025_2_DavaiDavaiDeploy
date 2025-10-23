import { Component, render } from '@react';
import { connect, Provider } from './modules/redux';
import type { Dispatch } from './modules/redux/types/actions.ts';
import type { State } from './modules/redux/types/store.ts';
import { store } from './redux/store.ts';

interface MyComponentProps {
	count: number;
	increment: () => void;
}

class MyComponent extends Component<MyComponentProps> {
	render() {
		return (
			<div>
				<p>Count: {this.props.count}</p>
				<button onClick={this.props.increment}>+</button>
			</div>
		);
	}
}

const mapStateToProps = (state: State) => ({
	count: state.counter.count,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	increment: () => {
		dispatch({ type: 'INCREMENT' });
	},
});

const ConnectedMyComponent = connect(
	mapStateToProps,
	mapDispatchToProps,
)(MyComponent);

render(
	<Provider store={store}>
		<ConnectedMyComponent />
	</Provider>,
	document.body,
);
