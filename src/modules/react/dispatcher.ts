import type { AfterCommandHandler, CommandHandler, Unsubscribe } from './types';

export class Dispatcher {
	#subs = new Map<string, CommandHandler[]>();
	#afterHandlers: AfterCommandHandler[] = [];

	subscribe(commandName: string, handler: CommandHandler): Unsubscribe {
		if (!this.#subs.has(commandName)) {
			this.#subs.set(commandName, []);
		}

		const handlers = this.#subs.get(commandName)!;

		if (handlers.includes(handler)) {
			return () => {};
		}

		handlers.push(handler);

		return () => {
			const idx = handlers.indexOf(handler);
			if (idx > -1) {
				handlers.splice(idx, 1);
			}
		};
	}

	afterEveryCommand(handler: AfterCommandHandler): Unsubscribe {
		this.#afterHandlers.push(handler);

		return () => {
			const idx = this.#afterHandlers.indexOf(handler);
			if (idx > -1) {
				this.#afterHandlers.splice(idx, 1);
			}
		};
	}

	dispatch<T = any>(commandName: string, payload?: T): void {
		if (this.#subs.has(commandName)) {
			this.#subs.get(commandName)!.forEach((handler) => handler(payload));
		} else {
			console.warn(`No handlers for command: ${commandName}`);
		}

		this.#afterHandlers.forEach((handler) => handler());
	}
}
