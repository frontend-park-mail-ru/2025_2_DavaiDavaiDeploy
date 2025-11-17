import { formatBirthInfo } from '@/helpers/formatBitrhInfoHelper/formatBitrhInfoHelper';
import { formatHeight } from '@/helpers/formatHeightHelper/formatHeightHelper';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
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
import { Headline } from '@/uikit/headline/headline.tsx';
import { Subhead } from '@/uikit/subhead/subhead.tsx';
import { Title } from '@/uikit/title/title.tsx';
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
				<Title
					className={styles.err}
					text="Актер не найден"
					size="5xl"
					weight="bold"
					color="accent"
				/>
			);
		}

		if (!this.props.actor) {
			return <div></div>;
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

		const photoSRC = getImageURL(photo);

		return (
			<div className={styles.actor}>
				<div className={styles.media}>
					{photoSRC && (
						<img
							src={photoSRC}
							alt={russian_name || 'Photo'}
							className={styles.cover}
						/>
					)}
				</div>

				<div className={styles.info}>
					<div className={styles.main}>
						{russian_name && (
							<Title className={styles.title} text={russian_name} size="5xl" />
						)}
						<span className={styles.subtitle}>
							{original_name && (
								<Subhead
									text={original_name}
									color="light"
									size="xs"
									opacity="80"
								/>
							)}
						</span>
					</div>

					<div className={styles.about}>
						<Title
							className={styles.aboutTitle}
							text="Информация"
							size="3xl"
							weight="bold"
						/>

						<div className={styles.table}>
							{formattedHeight && (
								<>
									<Headline
										className={styles.fact}
										text="Рост"
										size="l"
										weight="bold"
									/>
									<Subhead
										text={formattedHeight}
										className={styles.value}
										opacity="80"
										size="m"
										color="light"
									/>
								</>
							)}

							{marital_status && (
								<>
									<Headline
										className={styles.fact}
										text="Семья"
										size="l"
										weight="bold"
									/>
									<Subhead
										text={marital_status}
										className={styles.value}
										opacity="80"
										size="m"
										color="light"
									/>
								</>
							)}

							{birthInfo && (
								<>
									<Headline
										className={styles.fact}
										text="Дата рождения"
										size="l"
										weight="bold"
									/>
									<Subhead
										text={birthInfo}
										className={styles.value}
										opacity="80"
										size="m"
										color="light"
									/>
								</>
							)}

							{!!films_number && (
								<>
									<Headline
										className={styles.fact}
										text="Всего фильмов"
										size="l"
										weight="bold"
									/>
									<Subhead
										text={films_number}
										className={styles.value}
										opacity="80"
										size="m"
										color="light"
									/>
								</>
							)}

							{birth_place && (
								<>
									<Headline
										className={styles.fact}
										text="Место рождения"
										size="l"
										weight="bold"
									/>
									<Subhead
										text={birth_place}
										className={styles.value}
										opacity="80"
										size="m"
										color="light"
									/>
								</>
							)}
						</div>

						<div className={styles.smallTable}>
							{formattedHeight && (
								<>
									<Headline
										className={styles.fact}
										text="Рост"
										size="l"
										weight="bold"
									/>
									<Subhead
										text={formattedHeight}
										className={styles.value}
										opacity="80"
										size="m"
										color="light"
									/>
								</>
							)}

							{marital_status && (
								<>
									<Headline
										className={styles.fact}
										text="Семья"
										size="l"
										weight="bold"
									/>
									<Subhead
										text={marital_status}
										className={styles.value}
										opacity="80"
										size="m"
										color="light"
									/>
								</>
							)}

							{smallBirthInfo && (
								<>
									<Headline
										className={styles.fact}
										text="Дата рождения"
										size="l"
										weight="bold"
									/>
									<Subhead
										text={smallBirthInfo}
										className={styles.value}
										opacity="80"
										size="m"
										color="light"
									/>
								</>
							)}

							{birth_place && (
								<>
									<Headline
										className={styles.fact}
										text="Место рождения"
										size="l"
										weight="bold"
									/>
									<Subhead
										text={birth_place}
										className={styles.value}
										opacity="80"
										size="m"
										color="light"
									/>
								</>
							)}

							{!!films_number && (
								<>
									<Headline
										className={styles.fact}
										text="Всего фильмов"
										size="l"
										weight="bold"
									/>
									<Subhead
										text={films_number}
										className={styles.value}
										opacity="80"
										size="m"
										color="light"
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
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
