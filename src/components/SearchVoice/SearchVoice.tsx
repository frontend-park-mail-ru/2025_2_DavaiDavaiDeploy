import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import actions from '@/redux/features/search/actions.ts';
import { Component } from '@robocotik/react';
import { IconButton } from 'ddd-ui-kit';
import {
	type IMediaRecorder,
	MediaRecorder,
	register,
} from 'extendable-media-recorder';
import { connect as WAVConnect } from 'extendable-media-recorder-wav-encoder';
import { MICROPHONE_STATES } from '../../consts/microphone';
import { getMicrophoneIconFromState } from '../../helpers/getMicrophoneIconFromState/getMicrophoneIconFromState';
import type { Map } from '../../types/map';
import { AppToast } from '../toastContainer/toastContainer';

interface SearchVoiceProps {
	getVoiceSearchResult: (searchWAV: Blob) => void;
	setVoiceSearchIsWorking: () => void;
	handleStopVoiceSearch: () => void;
	className?: string;
}

interface SearchVoiceState {
	microphoneState: (typeof MICROPHONE_STATES)[keyof typeof MICROPHONE_STATES];
	mediaRecorder: IMediaRecorder | null;
	stream: MediaStream | null;
	audioChunks: Blob[];
}

class SearchVoiceComponent extends Component<
	SearchVoiceProps,
	SearchVoiceState
> {
	state: SearchVoiceState = {
		microphoneState: MICROPHONE_STATES.INACTIVE,
		mediaRecorder: null,
		stream: null,
		audioChunks: [],
	};

	async onMount() {
		try {
			await register(await WAVConnect());
		} catch {}
	}

	onUnmount() {
		this.cleanupRecording();
	}

	cleanupRecording = () => {
		const { stream } = this.state;

		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
		}

		this.setState({
			stream: null,
			mediaRecorder: null,
			audioChunks: [],
		});
	};

	handleStartRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});

			const mediaRecorder = new MediaRecorder(stream, {
				mimeType: 'audio/wav',
			});

			this.setState({
				stream,
				mediaRecorder,
				audioChunks: [],
			});

			mediaRecorder.ondataavailable = (e) => {
				if (e.data.size > 0) {
					this.setState((prevState) => ({
						audioChunks: [...prevState.audioChunks, e.data],
					}));
				}
			};

			mediaRecorder.onstop = () => {
				const { audioChunks } = this.state;
				const audioBlob = new Blob(audioChunks, {
					type: 'audio/wav',
				});

				this.props.handleStopVoiceSearch();
				this.props.getVoiceSearchResult(audioBlob);
				this.cleanupRecording();
			};

			mediaRecorder.start();
		} catch {
			this.setState({ microphoneState: MICROPHONE_STATES.INACTIVE });
			this.props.handleStopVoiceSearch();
			this.cleanupRecording();
			AppToast.info('Разрешите доступ к микрофону');
		}
	};

	handleStopRecording = () => {
		const { mediaRecorder } = this.state;

		if (mediaRecorder && mediaRecorder.state !== 'inactive') {
			mediaRecorder.stop();
		}
	};

	handleMicrophoneClick = () => {
		if (this.state.microphoneState === MICROPHONE_STATES.INACTIVE) {
			this.setState({ microphoneState: MICROPHONE_STATES.ACTIVE });
			this.handleStartRecording();
			this.props.setVoiceSearchIsWorking();
			return;
		}

		if (this.state.microphoneState === MICROPHONE_STATES.ACTIVE) {
			this.setState({ microphoneState: MICROPHONE_STATES.LOADING });
			this.props.handleStopVoiceSearch();
			this.handleStopRecording();
			this.setState({ microphoneState: MICROPHONE_STATES.INACTIVE });
		}
	};

	render() {
		return (
			<IconButton
				mode="tertiary"
				className={this.props.className}
				onClick={this.handleMicrophoneClick}
			>
				{getMicrophoneIconFromState(this.state.microphoneState)}
			</IconButton>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getVoiceSearchResult: (searchWAV: Blob) =>
		dispatch(actions.getVoiceSearchResultAction(searchWAV)),
	setVoiceSearchIsWorking: () => dispatch(actions.setVoiceSearchIsWorking()),
	handleStopVoiceSearch: () => dispatch(actions.stopVoiceSearch()),
});

export const SearchVoice = compose(connect(null, mapDispatchToProps))(
	SearchVoiceComponent,
);
