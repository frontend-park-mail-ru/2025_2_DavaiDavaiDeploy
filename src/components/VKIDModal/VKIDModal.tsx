import { Component } from '@robocotik/react';
import { Flex } from 'ddd-ui-kit';
import { BaseModal, type BaseModalProps } from '../BaseModal/BaseModal';

export interface VKIDModalProps {
	num: number;
}

interface VKIDState {
	input: string;
}

export class VKIDModalComponent extends Component<BaseModalProps, VKIDState> {
	state = {
		input: '',
	};
	render() {
		return (
			<BaseModal closeOnOverlayClick={false}>
				<Flex direction="column" justify="around" align="center">
					<input
						value={this.state.input}
						type="text"
						name="login"
						id="vkid-login"
					/>
					<button>Войти</button>
				</Flex>
			</BaseModal>
		);
	}
}

export const VKIDModal = VKIDModalComponent;
