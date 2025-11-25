import Microphone from '@/assets/img/microphone.svg?react';
import MicrophoneLoadingIcon from '@/assets/img/microphone_is_loading.svg?react';
import MicrophoneActiveIcon from '@/assets/img/microphone_is_work.svg?react';
import { MICROPHONE_STATES } from '../../consts/microphone';
import clsx from '../../modules/clsx';
import styles from './getMicrophoneIconFromState.module.scss';

export const getMicrophoneIconFromState = (
	state: (typeof MICROPHONE_STATES)[keyof typeof MICROPHONE_STATES],
	classNames?: string,
) => {
	switch (state) {
		case MICROPHONE_STATES.ACTIVE:
			return <MicrophoneActiveIcon className={classNames ? classNames : ''} />;
		case MICROPHONE_STATES.INACTIVE:
			return <Microphone className={classNames ? classNames : ''} />;
		case MICROPHONE_STATES.LOADING:
			return (
				<MicrophoneLoadingIcon className={clsx(classNames, styles.loading)} />
			);
	}
};
