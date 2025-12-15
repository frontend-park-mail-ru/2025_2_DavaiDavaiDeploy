/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PRODUCTION_API_URL: string;
	readonly VITE_SENTRY_ENABLED: string;
	readonly VITE_SENTRY_DSN: string;
	readonly SENTRY_ORG: string;
	readonly SENTRY_PROJECT: string;
	readonly SENTRY_AUTH_TOKEN: string;
	readonly VITE_PRODUCTION_URL: string;
	readonly VITE_CDN_ADDRESS: string;
	readonly VITE_RELEASE_VERSION: string;
	readonly VITE_VK_SDK_APP_ID: number;
	readonly VITE_VK_ID_REDIRECT_URL: string;
	readonly VITE_IS_SW_ENABLED: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
