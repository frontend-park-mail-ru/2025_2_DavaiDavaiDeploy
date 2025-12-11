import { formatBirthInfo } from '@/helpers/formatBitrhInfoHelper/formatBitrhInfoHelper';
import { formatHeight } from '@/helpers/formatHeightHelper/formatHeightHelper';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import type { ModelsActorPage } from '@/types/models';
import { Component } from '@robocotik/react';
import { Flex, Headline, Image, Subhead, Title } from 'ddd-ui-kit';
import styles from './actorInfo.module.scss';

interface ActorInfoProps {
	actor: ModelsActorPage | null;
	error: string | null;
}

export class ActorInfo extends Component<ActorInfoProps> {
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
						src={getImageURL(photo)}
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
