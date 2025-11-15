import type { FeedBack } from '@/components/feedBack/feedBack';
import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

const setMessageLoadingAction = (): Action => {
	return {
		type: actionTypes.MESSAGE_LOADING,
	};
};

const returnMessageAction = (data: FeedBack): Action => {
	return {
		type: actionTypes.MESSAGE_LOADED,
		payload: { message: data },
	};
};

const returnMessageErrorAction = (error: string): Action => {
	return {
		type: actionTypes.MESSAGE_ERROR,
		payload: { message: {}, error: error },
	};
};

const sendMessageAction: Action =
	(category: string, description: string, file?: File) =>
	async (dispatch: Dispatch) => {
		dispatch(setMessageLoadingAction());

		if (file) {
			const formData = new FormData();
			formData.append('attachment', file);
		}

		try {
			if (file) {
				const response = await HTTPClient.post<FeedBack>(`/feedback`, {
					data: {
						description,
						category,
						formData,
					},
				});
			} else {
				const response = await HTTPClient.post<FeedBack>(`/feedback`, {
					data: {
						description,
						category,
					},
				});
			}

			dispatch(returnMessageAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnMessageErrorAction(errorMessage));
		}
	};

export default {
	sendMessageAction,
};
