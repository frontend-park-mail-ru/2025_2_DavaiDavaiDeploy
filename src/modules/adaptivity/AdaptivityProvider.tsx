import { Component } from '@robocotik/react';
import { debounce } from '../../helpers/debounceHelper/debounceHelper';
import { AdaptivityContext } from './AdaptivityContext.ts';

const DESKTOP_MIN_WIDTH = 1280;
const TABLET_MIN_WIDTH = 1024;
const DEBOUNCE_DELAY = 100;

export class AdaptivityProvider extends Component {
	state = {
		isDesktop: false,
		isTablet: false,
	};

	handleResize = () => {
		if (
			window.matchMedia(`(width >= ${DESKTOP_MIN_WIDTH}px)`).matches ===
			this.state.isDesktop
		) {
			this.setState({
				isDesktop: window.matchMedia(`(width >= ${DESKTOP_MIN_WIDTH}px)`)
					.matches,
			});
		}

		if (
			window.matchMedia(
				`(width >= ${TABLET_MIN_WIDTH}px) and (width <= ${DESKTOP_MIN_WIDTH}px)`,
			).matches === this.state.isTablet
		) {
			this.setState({
				isTablet: window.matchMedia(
					`(width >= ${TABLET_MIN_WIDTH}px) and (width <= ${DESKTOP_MIN_WIDTH}px)`,
				),
			});
		}
	};

	debounceResize = debounce(this.handleResize, DEBOUNCE_DELAY);

	onMount() {
		window.addEventListener('resize', this.debounceResize);
	}

	onUnmount() {
		window.removeEventListener('resize', this.debounceResize);
	}

	render() {
		return (
			<AdaptivityContext.Provider
				value={{
					isDesktop: this.state.isDesktop,
				}}
			>
				{this.props.children}
			</AdaptivityContext.Provider>
		);
	}
}
