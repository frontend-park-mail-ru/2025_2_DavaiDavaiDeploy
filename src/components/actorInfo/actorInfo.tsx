import { formatBirthInfo } from '@/helpers/formatBitrhInfoHelper/formatBitrhInfoHelper';
import { formatHeight } from '@/helpers/formatHeightHelper/formatHeightHelper';
import { getImageSRC } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { RouterContext } from '@/modules/router/routerContext';
import actions from '@/redux/features/actor/actions';
import {
	selectActor,
	selectActorError,
} from '@/redux/features/actor/selectors';
import type { Map } from '@/types/map';
import type { ModelsActorPage } from '@/types/models';
import { Component } from '@robocotik/react';
import styles from './actorInfo.module.scss';

interface ActorInfoProps {
	actor: ModelsActorPage;
	error: string | null;
	getActor: (id: string) => void;
}

class ActorInfoComponent extends Component<ActorInfoProps> {
	static readonly contextType = RouterContext;

	onMount() {
		this.props.getActor(this.context.params.id);
	}

	render() {
		if (this.props.error) {
			return <div className={styles.err}>Актер не найден</div>;
		}

		if (Object.keys(this.props.actor).length === 0) {
			return <div className={styles.err}>Загрузка актера</div>;
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
		} = this.props.actor;

		const formattedHeight = formatHeight(height);
		const birthInfo = formatBirthInfo(birth_date, age, zodiac_sign);
		const smallBirthInfo = formatBirthInfo(birth_date);

		const photoSRC = getImageSRC('actors', '1', 'jpg');

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
						{russian_name && <h1 className={styles.title}>{russian_name}</h1>}
						<span className={styles.subtitle}>
							{original_name && <h3>{original_name}</h3>}
						</span>
					</div>

					<div className={styles.about}>
						<h1 className={styles.aboutTitle}>О персоне</h1>

						<div className={styles.table}>
							{formattedHeight && (
								<>
									<p className={styles.fact}>Рост</p>
									<p className={styles.value}>{formattedHeight}</p>
								</>
							)}

							{marital_status && (
								<>
									<p className={styles.fact}>Семья</p>
									<p className={styles.value}>{marital_status}</p>
								</>
							)}

							{birthInfo && (
								<>
									<p className={styles.fact}>Дата рождения</p>
									<p className={styles.value}>{birthInfo}</p>
								</>
							)}

							{!!films_number && (
								<>
									<p className={styles.fact}>Всего фильмов</p>
									<p className={styles.value}>{films_number}</p>
								</>
							)}

							{birth_place && (
								<>
									<p className={styles.fact}>Место рождения</p>
									<p className={styles.value}>{birth_place}</p>
								</>
							)}
						</div>

						<div className={styles.smallTable}>
							{formattedHeight && (
								<>
									<p className={styles.fact}>Рост</p>
									<p className={styles.value}>{formattedHeight}</p>
								</>
							)}

							{marital_status && (
								<>
									<p className={styles.fact}>Семья</p>
									<p className={styles.value}>{marital_status}</p>
								</>
							)}

							{smallBirthInfo && (
								<>
									<p className={styles.fact}>Дата рождения</p>
									<p className={styles.value}>{smallBirthInfo}</p>
								</>
							)}

							{birth_place && (
								<>
									<p className={styles.fact}>Место рождения</p>
									<p className={styles.value}>{birth_place}</p>
								</>
							)}

							{!!films_number && (
								<>
									<p className={styles.fact}>Всего фильмов</p>
									<p className={styles.value}>{films_number}</p>
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

export const ActorInfo = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ActorInfoComponent);
