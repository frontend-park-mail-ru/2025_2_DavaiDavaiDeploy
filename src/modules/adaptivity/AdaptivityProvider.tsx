import { Component } from '@robocotik/react';
import { AdaptivityContext } from './AdaptivityContext.ts';
import {
	DesktopScreen,
	MobileScreen,
	SmallMobileScreen,
	SmallTabletScreen,
	TabletScreen,
} from './adaptivities';

interface AdaptivityState {
	isDesktop: boolean;
	isTablet: boolean;
	isSmallTablet: boolean;
	isMobile: boolean;
	isSmallMobile: boolean;
}

export class AdaptivityProvider extends Component<{}, AdaptivityState> {
	state = {
		isDesktop: false,
		isTablet: false,
		isSmallTablet: false,
		isMobile: false,
		isSmallMobile: false,
	};

	mediaXhandler = (
		e: MediaQueryListEvent,
		key: keyof AdaptivityState,
	): void => {
		this.setState({
			[key]: e.matches,
		});
	};

	mediaHandlers = () => {
		DesktopScreen.addEventListener('change', (e) =>
			this.mediaXhandler(e, 'isDesktop'),
		);

		TabletScreen.addEventListener('change', (e) =>
			this.mediaXhandler(e, 'isTablet'),
		);

		SmallTabletScreen.addEventListener('change', (e) =>
			this.mediaXhandler(e, 'isSmallTablet'),
		);

		MobileScreen.addEventListener('change', (e) =>
			this.mediaXhandler(e, 'isMobile'),
		);

		SmallMobileScreen.addEventListener('change', (e) =>
			this.mediaXhandler(e, 'isSmallMobile'),
		);
	};

	onMount() {
		window.addEventListener('change', this.mediaHandlers);
	}

	onUnmount() {
		window.removeEventListener('change', this.mediaHandlers);
	}
	render() {
		return (
			<AdaptivityContext.Provider
				value={{
					isDesktop: this.state.isDesktop,
					isTablet: this.state.isTablet,
					isSmallTablet: this.state.isSmallTablet,
					isMobile: this.state.isMobile,
					isSmallMobile: this.state.isSmallMobile,
				}}
			>
				{this.props.children}
			</AdaptivityContext.Provider>
		);
	}
}
