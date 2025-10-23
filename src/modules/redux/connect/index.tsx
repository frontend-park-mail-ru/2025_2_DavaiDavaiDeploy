import { Component, createContext } from '../../react';
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

			private unsubscribe?: () => void;

			constructor(props: Props) {
				super(props);
				// Инициализируем пустым состоянием, контекст будет доступен после монтирования
				this.state = {};
			}

			onMount(): void {
				// Контекст доступен только после монтирования
				if (this.context && typeof this.context.getState === 'function') {
					// Устанавливаем начальное состояние из store
					this.setState(this.context.getState());

					// Подписываемся на изменения store
					this.unsubscribe = this.context.subscribe(() => {
						const newState = this.context.getState();
						this.setState(newState);
					});
				}
			}

			onWillUnmount(): void {
				// Отписываемся от изменений store
				if (this.unsubscribe) {
					this.unsubscribe();
				}
			}

			render(): VDOMNode {
				if (!this.context) {
					throw new Error(
						'Connect component must be used within a StoreContext.Provider',
					);
				}

				const store = this.context;
				const stateProps = mapStateToProps
					? mapStateToProps(store.getState())
					: {};
				const dispatchProps = mapDispatchToProps
					? mapDispatchToProps(store.dispatch)
					: {};

				// Объединяем оригинальные пропсы с пропсами из store
				const combinedProps = {
					...this.props,
					...stateProps,
					...dispatchProps,
				};

				return (
					<WrappedComponent {...combinedProps}>
						{this.props.children}
					</WrappedComponent>
				);
			}
		}

		return Connect as ConnectedConstructor<Props>;
	};
}
