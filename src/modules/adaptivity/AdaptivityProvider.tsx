import { Component } from '@robocotik/react';
import { getClosestViewWidth } from '../../helpers/getClosestViewWidth/getClosestViewWidth';
import { AdaptivityContext } from './AdaptivityContext.ts';
import {
	DesktopScreen,
	MobileScreen,
	SmallMobileScreen,
	SmallTabletScreen,
	TabletScreen,
} from './adaptivities';

export interface AdaptivityState {
	isDesktop: boolean;
	isTablet: boolean;
	isSmallTablet: boolean;
	isMobile: boolean;
	isSmallMobile: boolean;
	viewWidth: number;
}

export class AdaptivityProvider extends Component<{}, AdaptivityState> {
	state = {
		isDesktop: DesktopScreen.matches,
		isTablet: TabletScreen.matches,
		isSmallTablet: SmallTabletScreen.matches,
		isMobile: MobileScreen.matches,
		isSmallMobile: SmallMobileScreen.matches,
		viewWidth: 0,
	};

	desktopHandler = (e: MediaQueryListEvent) =>
		this.mediaXhandler(e, 'isDesktop');
	tabletHandler = (e: MediaQueryListEvent) => this.mediaXhandler(e, 'isTablet');
	smallTabletHandler = (e: MediaQueryListEvent) =>
		this.mediaXhandler(e, 'isSmallTablet');
	mobileHandler = (e: MediaQueryListEvent) => this.mediaXhandler(e, 'isMobile');
	smallMobileHandler = (e: MediaQueryListEvent) =>
		this.mediaXhandler(e, 'isSmallMobile');

	mediaXhandler = (
		e: MediaQueryListEvent,
		key: keyof AdaptivityState,
	): void => {
		this.setState({
			[key]: e.matches,
		});
	};

	initializeState = () => {
		this.setState({
			isDesktop: DesktopScreen.matches,
			isTablet: TabletScreen.matches,
			isSmallTablet: SmallTabletScreen.matches,
			isMobile: MobileScreen.matches,
			isSmallMobile: SmallMobileScreen.matches,
			viewWidth: getClosestViewWidth(this.state),
		});
	};

	subscribeToMediaQueries = () => {
		DesktopScreen.addEventListener('change', this.desktopHandler);
		TabletScreen.addEventListener('change', this.tabletHandler);
		SmallTabletScreen.addEventListener('change', this.smallTabletHandler);
		MobileScreen.addEventListener('change', this.mobileHandler);
		SmallMobileScreen.addEventListener('change', this.smallMobileHandler);
	};

	unsubscribeFromMediaQueries = () => {
		DesktopScreen.removeEventListener('change', this.desktopHandler);
		TabletScreen.removeEventListener('change', this.tabletHandler);
		SmallTabletScreen.removeEventListener('change', this.smallTabletHandler);
		MobileScreen.removeEventListener('change', this.mobileHandler);
		SmallMobileScreen.removeEventListener('change', this.smallMobileHandler);
	};

	onMount() {
		this.initializeState();
		this.subscribeToMediaQueries();
	}

	onUnmount() {
		this.unsubscribeFromMediaQueries();
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
					viewWidth: this.state.viewWidth,
				}}
			>
				{this.props.children}
			</AdaptivityContext.Provider>
		);
	}
}
