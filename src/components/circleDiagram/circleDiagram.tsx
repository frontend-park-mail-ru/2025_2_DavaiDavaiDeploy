import { Component } from '@robocotik/react';
import styles from './circleDiagram.module.css';

interface CircleDiagramProps {
	all: number;
	done: number;
	inProgress: number;
}

export class CircleDiagram extends Component<CircleDiagramProps> {
	render() {
		const { all, done, inProgress } = this.props;

		const donePercent = all > 0 ? (done / all) * 100 : 0;
		const inProgressPercent = all > 0 ? (inProgress / all) * 100 : 0;

		const radius = 45;
		const circumference = 2 * Math.PI * radius;

		
		const doneLength = (donePercent / 100) * circumference;
		const inProgressLength = (inProgressPercent / 100) * circumference;

		const doneOffset = circumference - doneLength;
		const inProgressOffset = circumference - inProgressLength;

		return (
			<div className={styles.container}>
				<h1 className={styles.title}>Анализ заявок</h1>

				<div className={styles.circleDiagram}>
					<svg width="120" height="120" className={styles.svg}>
						<circle
							cx="60"
							cy="60"
							r={radius}
							fill="none"
							stroke="#e0e0e0"
							strokeWidth="8"
						/>

						<circle
							cx="60"
							cy="60"
							r={radius}
							fill="none"
							stroke="#4caf50"
							strokeWidth="8"
							strokeDasharray={circumference}
							strokeDashoffset={doneOffset}
							strokeLinecap="round"
							transform="rotate(-90 60 60)"
							className={styles.doneCircle}
						/>

						<circle
							cx="60"
							cy="60"
							r={radius}
							fill="none"
							stroke="#ff9800"
							strokeWidth="8"
							strokeDasharray={circumference}
							strokeDashoffset={inProgressOffset}
							strokeLinecap="round"
							transform={`rotate(${(donePercent / 100) * 360} 60 60)`}
							className={styles.inProgressCircle}
						/>

						<text
							x="60"
							y="60"
							textAnchor="middle"
							dominantBaseline="middle"
							className={styles.centerText}
							transform="rotate(90 60 60)"
						>
							{all}
						</text>
					</svg>
				</div>

				<div className={styles.legend}>
					<div className={styles.legendItem}>
						<div
							className={styles.legendColor}
							style={{ backgroundColor: '#4caf50' }}
						></div>
						<span>
							Выполнено: {done} ({donePercent.toFixed(1)}%)
						</span>
					</div>
					<div className={styles.legendItem}>
						<div
							className={styles.legendColor}
							style={{ backgroundColor: '#ff9800' }}
						></div>
						<span>
							В процессе: {inProgress} ({inProgressPercent.toFixed(1)}%)
						</span>
					</div>
					{all - done - inProgress > 0 && (
						<div className={styles.legendItem}>
							<div
								className={styles.legendColor}
								style={{ backgroundColor: '#e0e0e0' }}
							></div>
							<span>Остальные: {all - done - inProgress}</span>
						</div>
					)}
				</div>
			</div>
		);
	}
}
