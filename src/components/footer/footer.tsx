import { Flex, Paragraph } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { compose, connect } from '../../modules/redux';
import type { State } from '../../modules/redux/types/store';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { selectIsOut } from '../../redux/features/film/selectors';
import type { Map } from '../../types/map';
import styles from './footer.module.scss';

interface FooterProps {
	isOut: boolean | null;
}

class FooterComponent extends Component<WithRouterProps & FooterProps> {
	render() {
		let type = 'base';

		if (this.props.router.path.startsWith('/films')) {
			type = 'light';

			if (!this.props.isOut) {
				type = 'dark';
			}
		}

		return (
			<Flex
				id="footer"
				className={styles[`footer-${type}`]}
				justify="center"
				align="center"
			>
				<Paragraph className={styles.content} color="accent" level="8">
					© Davai Film, 2025
				</Paragraph>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	isOut: selectIsOut(state),
});

export const Footer = compose(
	withRouter,
	connect(mapStateToProps),
)(FooterComponent);
