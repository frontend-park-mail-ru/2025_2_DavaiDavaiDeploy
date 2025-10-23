import { Component, createContext } from '@react';
import type { VDOMNode } from '@react/types';
import type { Dispatch } from '../types/actions';
import type { State, Store } from '../types/store';

export const StoreContext = createContext<Store | null>(null);

type ComponentConstructor<
	Props = any,
	ComponentState = any,
	Context = any,
> = new (props: Props) => Component<Props, ComponentState, Context>;

type ConnectedConstructor<Props> = ComponentConstructor<Props, State, Store>;

type WrappedToConnected<Props, ComponentState, Context> = (
	WrappedComponent: ComponentConstructor<Props, ComponentState, Context>,
) => ConnectedConstructor<Props>;

export function connect<Props = any, ComponentState = any, Context = any>(
	mapStateToProps?: (state: State) => Record<string, any>,
	mapDispatchToProps?: (dispatch: Dispatch) => Record<string, any>,
): WrappedToConnected<Props, ComponentState, Context> {
	return (
		WrappedComponent: ComponentConstructor<Props, ComponentState, Context>,
	): ConnectedConstructor<Props> => {
		class Connect extends Component<Props, State, Store> {
			static contextType = StoreContext;

			private unsubscribe?: () => void;

			onMount() {
				const store = this.context;

				if (store) {
					this.unsubscribe = store.subscribe(() => {
						this.setState({});
					});
				}
			}

			onWillUnmount() {
				if (this.unsubscribe) {
					this.unsubscribe();
				}
			}

			render(): VDOMNode {
				const store = this.context || StoreContext.value;

				return (
					<WrappedComponent
						{...this.props}
						{...(mapStateToProps && store
							? mapStateToProps(store.getState())
							: {})}
						{...(mapDispatchToProps && store
							? mapDispatchToProps(store.dispatch)
							: {})}
					>
						{this.props.children}
					</WrappedComponent>
				);
			}
		}

		return Connect as ConnectedConstructor<Props>;
	};
}
