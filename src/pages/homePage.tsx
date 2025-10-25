import { ConnectedTopFilm } from '@/components/topFilm/topFilm';
import { Component } from '@react';

export class HomePage extends Component {
	render() {
		return (
			<div class="page">
				<main class="main">
					<ConnectedTopFilm />
					<section class="films"></section>
				</main>
			</div>
		);
	}
}
