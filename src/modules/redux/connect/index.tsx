import { Component, createContext } from '../../react/index';
import type { VDOMNode } from '../../react/types';
import type { Dispatch } from '../types/actions';
import type { State, Store } from '../types/store';

// Создаем контекст для Redux Store
export const StoreContext = createContext<Store>(null as unknown as Store);

// Тип конструктора компонента
type ComponentConstructor<
	Props = any,
	ComponentState = any,
	Context = any,
> = new (props: Props) => Component<Props, ComponentState, Context>;

// Тип подключенного компонента
type ConnectedConstructor<Props> = ComponentConstructor<Props, State, Store>;

// Тип функции-обертки
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

			state = {};

			private unsubscribe?: () => void;

			onMount() {
				if (this.context) {
					this.unsubscribe = this.context.subscribe((state: any): void => {
						this.setState(state);
					});
				}
			}

			subscribeToStore() {
				if (this.context) {
					this.unsubscribe = this.context.subscribe((store) => {
						this.setState({ store });
					});
				}
			}

			onWillUnmount() {
				if (this.unsubscribe) {
					this.unsubscribe();
				}
			}

			render(): VDOMNode {
				const store = this.context;
				this.subscribeToStore(); //костыль

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
