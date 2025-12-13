/// <reference types="cypress" />
///<reference types="cypress-real-events" />

declare global {
	namespace Cypress {
		interface Chainable {
			setupAuthMocks(authState: 'authorized' | 'unauthorized'): Chainable<void>;
			login(email: string, password: string): Chainable<void>;
			register(
				name: string,
				phone: string,
				email: string,
				password: string,
			): Chainable<void>;
			verifyProfile(user: Record<string, string>): Chainable<void>;
		}
	}
}

export {};
