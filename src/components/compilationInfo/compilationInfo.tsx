import type { ModelsCompilation } from '@/types/models';
import { Component } from '@robocotik/react';
import { Flex, Paragraph, Title } from 'ddd-ui-kit';
import styles from './compilationInfo.module.scss';

interface CompilationInfoProps {
	compilation: ModelsCompilation | null;
}

export class CompilationInfo extends Component<CompilationInfoProps> {
	render() {
		if (!this.props.compilation) {
			return <div />;
		}

		const { title, description } = this.props.compilation;

		return (
			<Flex
				className={styles.compilation}
				justify="center"
				align="center"
				direction="column"
			>
				<Title level="2" align="center" className="title">
					{title}
				</Title>
				<Paragraph
					className={styles.description}
					level="8"
					align="center"
					color="light"
				>
					{description}
				</Paragraph>
			</Flex>
		);
	}
}
