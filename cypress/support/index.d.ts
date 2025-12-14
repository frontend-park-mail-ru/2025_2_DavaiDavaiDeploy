/// <reference types="cypress" />
///<reference types="cypress-real-events" />

declare global {
	namespace Cypress {
		interface Chainable {
			setupAuthMocks(authState: 'authorized' | 'unauthorized'): Chainable<void>;
			login(login: string, password: string): Chainable<void>;
			register(login: string, password: string): Chainable<void>;
			verifyProfile(user: Record<string, string>): Chainable<void>;
			favorites(filmTitle: string): Chainable<void>;
		}
	}
}

export {};
