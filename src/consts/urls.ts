import { isProduction } from './isProduction';

export const STATIC_URL = `${import.meta.env.VITE_CDN_ADDRESS}/static/`;

export const PRODUCTION_URL = import.meta.env.VITE_PRODUCTION_URL;

export const PRODUCTION_URL_WITH_SCHEMA = `https://${import.meta.env.VITE_PRODUCTION_URL}/`;

export const TECH_SUP_URL = isProduction
	? `${PRODUCTION_URL_WITH_SCHEMA}techsup`
	: `http://localhost:3000/techsup`;
