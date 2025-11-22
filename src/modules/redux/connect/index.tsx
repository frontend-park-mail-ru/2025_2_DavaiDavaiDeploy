import { Component, createContext, type ComponentType } from '@robocotik/react';
import type { Dispatch } from '../types/actions';
import type { State, Store } from '../types/store';

export const StoreContext = createContext<Store | null>(null);

type ConnectedConstructor<Props> = ComponentType<Props, State, Store>;

type WrappedToConnected<Props, ComponentState, Context> = (
	WrappedComponent: ComponentType<Props, ComponentState, Context>,
) => ConnectedConstructor<Props>;

export function connect<Props = any, ComponentState = any, Context = any>(
	mapStateToProps?: ((state: State) => Record<string, any>) | null,
	mapDispatchToProps?: (dispatch: Dispatch) => Record<string, any>,
): WrappedToConnected<Props, ComponentState, Context> {
	return (
		WrappedComponent: ComponentType<Props, ComponentState, Context>,
	): ConnectedConstructor<Props> => {
		class Connect extends Component<Props, State, Store> {
			static readonly contextType = StoreContext;

			private unsubscribe?: () => void;

			onMount() {
				const store = this.context;

				if (store) {
					this.unsubscribe = store.subscribe(() => {
						this.setState(store.getState());
					});
				}
			}

			onWillUnmount() {
				if (this.unsubscribe) {
					this.unsubscribe();
				}
			}

			render() {
				const store = this.context || StoreContext.defaultValue;

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

		return Connect as unknown as ConnectedConstructor<Props>;
	};
}
