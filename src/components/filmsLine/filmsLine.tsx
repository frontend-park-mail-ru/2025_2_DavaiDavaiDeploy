import type { ModelsMainPageFilm } from '@/types/models';
import { Component } from '@robocotik/react';
import clsx from 'ddd-clsx';
import { Flex, Title } from 'ddd-ui-kit';
import { FilmCard } from '../filmCard/filmCard';
import styles from './filmsLine.module.scss';

interface FilmsLineProps {
	films: ModelsMainPageFilm[] | null;
	title: string;
	isDark?: boolean;
	className?: string;
}

export class FilmsLine extends Component<FilmsLineProps> {
	render() {
		const { films, title, isDark, className } = this.props;

		if (!films) {
			return <div />;
		}

		return (
			<Flex className={clsx(styles.filmsLine, className)} direction="column">
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
