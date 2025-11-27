import { Component } from '@robocotik/react';
import {
	DESKTOP_MIN_WIDTH,
	MOBILE_MIN_WIDTH,
	SMALL_MOBILE_MAX_WIDTH,
	SMALL_TABLET_MIN_WIDTH,
	TABLET_MIN_WIDTH,
	WIDE_SCREEN_WIDTH,
} from '../../consts/adaptivity';
import { getClosestViewWidth } from '../../helpers/getClosestViewWidth/getClosestViewWidth';
import { AdaptivityContext } from './AdaptivityContext.ts';
import {
	DesktopScreen,
	MobileScreen,
	SmallMobileScreen,
	SmallTabletScreen,
	TabletScreen,
	WideDesktopScreen,
} from './adaptivities';

export interface AdaptivityState {
	isWideDesktop: boolean;
	isDesktop: boolean;
	isTablet: boolean;
	isSmallTablet: boolean;
	isMobile: boolean;
	isSmallMobile: boolean;
	viewWidth: number;
}

export class AdaptivityProvider extends Component<{}, AdaptivityState> {
	state = {
		isWideDesktop: WideDesktopScreen.matches,
		isDesktop: DesktopScreen.matches,
		isTablet: TabletScreen.matches,
		isSmallTablet: SmallTabletScreen.matches,
		isMobile: MobileScreen.matches,
		isSmallMobile: SmallMobileScreen.matches,
		viewWidth: 0,
	};

	wideDesktopHandler = (e: MediaQueryListEvent) => {
		this.mediaXhandler(e, 'isWideDesktop');
		this.setState({ viewWidth: WIDE_SCREEN_WIDTH });
	};

	desktopHandler = (e: MediaQueryListEvent) => {
		this.mediaXhandler(e, 'isDesktop');
		this.setState({ viewWidth: DESKTOP_MIN_WIDTH });
	};

	tabletHandler = (e: MediaQueryListEvent) => {
		this.mediaXhandler(e, 'isTablet');
		this.setState({ viewWidth: TABLET_MIN_WIDTH });
	};
	smallTabletHandler = (e: MediaQueryListEvent) => {
		this.mediaXhandler(e, 'isSmallTablet');
		this.setState({ viewWidth: SMALL_TABLET_MIN_WIDTH });
	};
	mobileHandler = (e: MediaQueryListEvent) => {
		this.mediaXhandler(e, 'isMobile');
		this.setState({ viewWidth: MOBILE_MIN_WIDTH });
	};
	smallMobileHandler = (e: MediaQueryListEvent) => {
		this.mediaXhandler(e, 'isSmallMobile');
		this.setState({ viewWidth: SMALL_MOBILE_MAX_WIDTH });
	};

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
			isWideDesktop: WideDesktopScreen.matches,
			isDesktop: DesktopScreen.matches,
			isTablet: TabletScreen.matches,
			isSmallTablet: SmallTabletScreen.matches,
			isMobile: MobileScreen.matches,
			isSmallMobile: SmallMobileScreen.matches,
			viewWidth: getClosestViewWidth(this.state),
		});
	};

	subscribeToMediaQueries = () => {
		WideDesktopScreen.addEventListener('change', this.wideDesktopHandler);
		DesktopScreen.addEventListener('change', this.desktopHandler);
		TabletScreen.addEventListener('change', this.tabletHandler);
		SmallTabletScreen.addEventListener('change', this.smallTabletHandler);
		MobileScreen.addEventListener('change', this.mobileHandler);
		SmallMobileScreen.addEventListener('change', this.smallMobileHandler);
	};

	unsubscribeFromMediaQueries = () => {
		WideDesktopScreen.removeEventListener('change', this.wideDesktopHandler);
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
					isWideDesktop: this.state.isWideDesktop,
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
