import { ActorInfo } from '@/components/actorInfo/actorInfo';
import { FilmSlider } from '@/components/filmSlider/filmSlider';
import { Component } from '@robocotik/react';
import styles from './actorPage.module.scss';

import * as Sentry from '@sentry/browser';

export class ActorPage extends Component {
	render() {
		Sentry.captureException(new EvalError('Our Error'));
		return (
			<div className={styles.page}>
				<main className={styles.main}>
					<ActorInfo />
					<FilmSlider />
				</main>
			</div>
		);
	}
}
