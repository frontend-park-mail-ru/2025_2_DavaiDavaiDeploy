import type { ComponentType } from '@robocotik/react';
import { Component } from '@robocotik/react';
import { AdaptivityContext } from './AdaptivityContext.ts';
import type { WithAdaptivityProps } from './withAdaptivityProps.ts';

type OmitAdaptivity<T> = Omit<T, keyof WithAdaptivityProps>;

export function withAdaptivity<P>(
	WrappedComponent: ComponentType<P & WithAdaptivityProps>,
) {
	return class WithAdaptivity extends Component<OmitAdaptivity<P>> {
		static readonly contextType = AdaptivityContext;

		state = {
			contextValue: this.context,
		};

		onMount() {
			this.setState({ contextValue: this.context });
		}

		onUpdate() {
			if (this.context !== this.state.contextValue) {
				this.setState({ contextValue: this.context });
			}
		}

		render() {
			// eslint-disable-next-line no-console
			console.log('В WITH ADAPTIVITY CONTEXT ', this.state.contextValue);

			return (
				<WrappedComponent
					{...(this.props as any)}
					adaptivity={this.state.contextValue}
				/>
			);
		}
	};
}
