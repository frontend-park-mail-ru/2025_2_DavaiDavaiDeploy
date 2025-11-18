import { formatBirthInfo } from '@/helpers/formatBitrhInfoHelper/formatBitrhInfoHelper';
import { formatHeight } from '@/helpers/formatHeightHelper/formatHeightHelper';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/actor/actions';
import {
	selectActor,
	selectActorError,
} from '@/redux/features/actor/selectors';
import type { Map } from '@/types/map';
import type { ModelsActorPage } from '@/types/models';
import { Flex, Headline, Image, Subhead, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import styles from './actorInfo.module.scss';

interface ActorInfoProps {
	actor: ModelsActorPage | null;
	error: string | null;
	getActor: (id: string) => void;
}

class ActorInfoComponent extends Component<ActorInfoProps & WithRouterProps> {
	onMount() {
		this.props.getActor(this.props.router.params.id);
	}

	render() {
		if (this.props.error) {
			return (
				<Title className={styles.err} level="2" weight="bold" color="accent">
					Актер не найден
				</Title>
			);
		}

		if (!this.props.actor) {
			return <div />;
		}

		const {
			age,
			birth_date,
			birth_place,
			films_number,
			height,
			marital_status,
			original_name,
			russian_name,
			zodiac_sign,
			photo,
		} = this.props.actor;

		const formattedHeight = formatHeight(height);
		const birthInfo = formatBirthInfo(birth_date, age, zodiac_sign);
		const smallBirthInfo = formatBirthInfo(birth_date);

		return (
			<Flex className={styles.actor} direction="row" align="start">
				<Flex className={styles.media} align="center" justify="center">
					<Image
						src={photo}
						alt={russian_name || 'Photo'}
						className={styles.cover}
					/>
				</Flex>

				<Flex className={styles.info} direction="column" align="start">
					<Flex className={styles.main} direction="column" align="start">
						{russian_name && (
							<Title className={styles.title} level="2">
								{russian_name}
							</Title>
						)}
						<Flex className={styles.subtitle} direction="row">
							{original_name && (
								<Subhead color="light" level="10" opacity="80">
									{original_name}
								</Subhead>
							)}
						</Flex>
					</Flex>

					<Flex className={styles.about} direction="column" align="start">
						<Title className={styles.aboutTitle} level="4" weight="bold">
							Информация
						</Title>

						<div className={styles.table}>
							{formattedHeight && (
								<>
									<Headline className={styles.fact} level="7" weight="bold">
										Рост
									</Headline>
									<Subhead
										className={styles.value}
										opacity="80"
										level="8"
										color="light"
									>
										{formattedHeight}
									</Subhead>
								</>
							)}

							{marital_status && (
								<>
									<Headline className={styles.fact} level="7" weight="bold">
										Семья
									</Headline>
									<Subhead
										className={styles.value}
										opacity="80"
										level="8"
										color="light"
									>
										{marital_status}
									</Subhead>
								</>
							)}

							{birthInfo && (
								<>
									<Headline className={styles.fact} level="7" weight="bold">
										Дата рождения
									</Headline>
									<Subhead
										className={styles.value}
										opacity="80"
										level="8"
										color="light"
									>
										{birthInfo}
									</Subhead>
								</>
							)}

							{!!films_number && (
								<>
									<Headline className={styles.fact} level="7" weight="bold">
										Всего фильмов
									</Headline>
									<Subhead
										className={styles.value}
										opacity="80"
										level="8"
										color="light"
									>
										{films_number.toString()}
									</Subhead>
								</>
							)}

							{birth_place && (
								<>
									<Headline className={styles.fact} level="7" weight="bold">
										Место рождения
									</Headline>
									<Subhead
										className={styles.value}
										opacity="80"
										level="8"
										color="light"
									>
										{birth_place}
									</Subhead>
								</>
							)}
						</div>

						<div className={styles.smallTable}>
							{formattedHeight && (
								<>
									<Headline className={styles.fact} level="7" weight="bold">
										Рост
									</Headline>
									<Subhead
										className={styles.value}
										opacity="80"
										level="8"
										color="light"
									>
										{formattedHeight}
									</Subhead>
								</>
							)}

							{marital_status && (
								<>
									<Headline className={styles.fact} level="7" weight="bold">
										Семья
									</Headline>
									<Subhead
										className={styles.value}
										opacity="80"
										level="8"
										color="light"
									>
										{marital_status}
									</Subhead>
								</>
							)}

							{smallBirthInfo && (
								<>
									<Headline className={styles.fact} level="7" weight="bold">
										Дата рождения
									</Headline>
									<Subhead
										className={styles.value}
										opacity="80"
										level="8"
										color="light"
									>
										{smallBirthInfo}
									</Subhead>
								</>
							)}

							{birth_place && (
								<>
									<Headline className={styles.fact} level="7" weight="bold">
										Место рождения
									</Headline>
									<Subhead
										className={styles.value}
										opacity="80"
										level="8"
										color="light"
									>
										{birth_place}
									</Subhead>
								</>
							)}

							{!!films_number && (
								<>
									<Headline className={styles.fact} level="7" weight="bold">
										Всего фильмов
									</Headline>
									<Subhead
										className={styles.value}
										opacity="80"
										level="8"
										color="light"
									>
										{films_number.toString()}
									</Subhead>
								</>
							)}
						</div>
					</Flex>
				</Flex>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	actor: selectActor(state),
	error: selectActorError(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getActor: (id: string) => dispatch(actions.getActorAction(id)),
});

export const ActorInfo = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(ActorInfoComponent);
