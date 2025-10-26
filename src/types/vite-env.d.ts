/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SENTRY_ENABLED: string;
	readonly VITE_SENTRY_DSN: string;
	readonly SENTRY_ORG: string;
	readonly SENTRY_PROJECT: string;
	readonly SENTRY_AUTH_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
