import { Component } from '@robocotik/react';
import styles from './loadingState.module.css';

export class LoadingState extends Component {
	render() {
		return <div className={styles.spinner}></div>;
	}
}
