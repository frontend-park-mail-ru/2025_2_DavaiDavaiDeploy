import { Link } from '@/modules/router/link.tsx';
import type { ModelsMainPageActor } from '@/types/models';
import { Flex, Image, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './actorCard.module.scss';

interface ActorCardProps {
	actor: ModelsMainPageActor;
}

export class ActorCard extends Component<ActorCardProps> {
	render() {
		const { id, photo, russian_name } = this.props.actor;

		return (
			<Flex className={styles.actorCard} direction="column">
				<div className={styles.imageContainer}>
					<Link href={`/actors/${id}`}>
						<Image className={styles.image} src={photo} alt={russian_name} />
					</Link>
				</div>
				<Flex className={styles.content} direction="column" align="center">
					<Link href={`/actors/${id}`}>
						<Title
							className={styles.title}
							weight="bold"
							level="6"
							align="center"
						>
							{russian_name}
						</Title>
					</Link>
				</Flex>
			</Flex>
		);
	}
}
