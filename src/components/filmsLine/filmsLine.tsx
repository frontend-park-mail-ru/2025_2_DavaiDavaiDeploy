import clsx from '@/modules/clsx';
import type { ModelsMainPageFilm } from '@/types/models';
import { Flex, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { FilmCard } from '../filmCard/filmCard';
import styles from './filmsLine.module.scss';

interface FilmsLineProps {
	films: ModelsMainPageFilm[] | null;
	title: string;
	isDark?: boolean;
}

export class FilmsLine extends Component<FilmsLineProps> {
	render() {
		const { films, title, isDark } = this.props;

		if (!films) {
			return <div />;
		}

		return (
			<Flex className={styles.filmsLine} direction="column">
				<Title
					className={clsx(styles.title, { [styles.dark]: !!isDark })}
					level="4"
					weight="bold"
				>
					{title}
				</Title>
				<Flex className={styles.films} direction="row">
					{films.map((film) => (
						<FilmCard film={film} isDark={isDark} />
					))}
				</Flex>
			</Flex>
		);
	}
}
