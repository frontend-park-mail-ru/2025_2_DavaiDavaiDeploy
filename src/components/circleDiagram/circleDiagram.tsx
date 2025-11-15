import { Component } from '@robocotik/react';
import styles from './circleDiagram.module.css';

interface CircleDiagramProps {
	all: number;
	done: number;
	inProgress: number;
}

export class CircleDiagram extends Component<CircleDiagramProps> {
	render() {
		return (
			<div>
				<h1>Анализ заявок</h1>
				<div className={styles.circleDiagram}>
					
				</div>
			</div>
		);
	}
}
